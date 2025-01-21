/* eslint-disable no-new-func */
import * as React from 'react';
import type {
  RemoteComponentPromise,
  RemoteComponentConfig,
  RemoteComponentSource,
  RemoteComponentProps,
} from '../@types';
import RSC from './RemoteComponent';
import axios, { type AxiosRequestConfig } from 'axios';
import ComponentCache from '../cache/componentCache';
import { RemoteComponentResponseHeaders } from '../utils/constants';
import { getTTLFromResponseHeaders } from '../utils/utils';

const cache = ComponentCache.getInstance<React.Component>();

const defaultGlobal = Object.freeze({
  require: (moduleId: string) => {
    if (moduleId === 'react') {
      return require('react');
    } else if (moduleId === 'react-native') {
      return require('react-native');
    } else if (moduleId === '@babel/runtime/helpers/typeof') {
      return require('@babel/runtime/helpers/typeof');
    } else if (moduleId === '@babel/runtime/helpers/interopRequireDefault') {
      return require('@babel/runtime/helpers/interopRequireDefault');
    } else if (moduleId === '@babel/runtime/helpers/slicedToArray') {
      return require('@babel/runtime/helpers/slicedToArray');
    }
    return null;
  },
});

const createComponent =
  (global: any) =>
  async (src: string): Promise<React.Component> => {
    const globalName = '__REMOTE_COMPONENT__';
    const Component = await new Function(
      globalName,
      `${Object.keys(global)
        .map((key) => `var ${key} = ${globalName}.${key};`)
        .join('\n')}; const exports = {}; ${src}; return exports.default`
    )(global);
    return Component;
  };

const axiosRequest = (config: AxiosRequestConfig) => axios(config);

const buildComponent =
  ({
    openURI,
  }: {
    readonly openURI: (
      uri: string,
      callback: RemoteComponentPromise<React.Component>
    ) => void;
  }) =>
  async (source: RemoteComponentSource): Promise<React.Component> => {
    if (source && typeof source === 'object') {
      if ('code' in source) {
        // Handle directly provided transpiled JSX source
        return createComponent(defaultGlobal)(source.code);
      }

      if ('uri' in source) {
        // Handle URI-based fetching
        return new Promise<React.Component>((resolve, reject) =>
          openURI(source.uri, { resolve, reject })
        );
      }
    }
    throw new Error(`[RemoteComponent]: Source is invalid`);
  };

const buildRequest =
  ({
    component,
  }: {
    readonly component: (src: string) => Promise<React.Component>;
  }) =>
  async (uri: string, callback: RemoteComponentPromise<React.Component>) => {
    try {
      const result = await axiosRequest({ url: uri, method: 'get' });
      const { data, headers } = result;
      var ttl = getTTLFromResponseHeaders(headers);
      if (
        headers[RemoteComponentResponseHeaders.ttl] &&
        headers[RemoteComponentResponseHeaders.ttl] !== ''
      ) {
        ttl = headers[RemoteComponentResponseHeaders.ttl];
      }

      if (typeof data !== 'string') {
        throw new Error(
          `[RemoteComponent]: Expected string data, encountered ${typeof data}`
        );
      }
      const Component = await component(data);
      cache.set(uri, {
        value: Component,
        ttl: ttl,
        timestamp: Date.now(),
      });
      return callback.resolve(Component);
    } catch (e) {
      cache.set(uri, null);
      console.log(`[RemoteComponent]: Build Request caught error ${e}`);
      return callback.reject(new Error(`${(e as Error).message}`));
    }
  };

const buildURIForRemoteComponent =
  ({
    uriRequest,
  }: {
    readonly uriRequest: (
      uri: string,
      callback: RemoteComponentPromise<React.Component>
    ) => void;
  }) =>
  (uri: string, callback: RemoteComponentPromise<React.Component>): void => {
    const cachedTimeStamp: number = cache.getTimeStamp(uri);
    const ttl: number = cache.getTTL(uri);
    const { resolve, reject } = callback;

    // No value found for ttl, serve component from cache if exists
    if (ttl === -1) {
      const Component = cache.get(uri);
      if (Component === null) {
        return uriRequest(uri, callback);
      } else if (typeof Component === 'function') {
        return resolve(Component);
      }
    }

    // ignore cache in case of ttl is 0
    // for any other value, check if cache needs to burst
    if (ttl === 0 || Date.now() - cachedTimeStamp > ttl) {
      cache.delete(uri);
      return uriRequest(uri, callback);
    }

    return reject(
      new Error(
        `[RemoteComponent]: Component for uri "${uri}" could not be instantiated`
      )
    );
  };

function buildRemoteComponent({ global }: RemoteComponentConfig) {
  const component = createComponent(global);
  const uriRequest = buildRequest({ component });
  const openURI = buildURIForRemoteComponent({ uriRequest });
  return buildComponent({ openURI });
}

function createRemoteComponent({ global }: RemoteComponentConfig) {
  const Component = (props: RemoteComponentProps) => (
    <RSC {...props} openRemoteComponent={buildRemoteComponent({ global })} />
  );
  return Object.freeze({
    Component,
  });
}

export function preloadRemoteComponent({
  global = defaultGlobal,
}: RemoteComponentConfig) {
  const remoteComponent = buildRemoteComponent({ global });
  const preload = async (uri: string): Promise<void> => {
    await remoteComponent({ uri });
  };
  return Object.freeze({
    preload,
  });
}

export const RemoteComponent = ({
  global = defaultGlobal,
  source,
  ...extras
}: RemoteComponentProps): JSX.Element | null => {
  const { Component } = React.useMemo(() => {
    return createRemoteComponent({ global });
  }, [global]);

  if (source && Component) {
    return <Component source={source} {...extras} />;
  }
  return null;
};
