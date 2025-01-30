export type RemoteComponentConfig = {
  readonly global?: any;
};

export type RemoteComponentSource =
  | {
      readonly uri: string;
    }
  | {
      readonly code: string;
    };

export type RemoteComponentActions = 'NAVIGATE' | 'IO' | 'STATE_CHANGE';

export type RemoteComponentProps<T = RemoteComponentActions> = {
  readonly global?: any;
  readonly source: RemoteComponentSource;
  readonly fallbackComponent?: JSX.Element;
  readonly loadingComponent?: JSX.Element;
  readonly errorComponent?: JSX.Element;
  readonly onError?: (error: Error) => void;
  readonly navigationRef?: React.Ref<any>;
  readonly onAction?: (action: T, payload: Record<string, any>) => void;
  readonly openRemoteComponent?: (
    source: RemoteComponentSource
  ) => Promise<React.Component>;
};

export type RemoteComponentPromise<T> = {
  readonly resolve: (result: T) => void;
  readonly reject: (error: Error) => void;
};
