import * as React from 'react';
import { type RemoteComponentProps } from '../@types';

export default function RSC({
  source,
  openRemoteComponent,
  fallbackComponent,
  loadingComponent = <React.Fragment />,
  errorComponent = <React.Fragment />,
  ...extras
}: RemoteComponentProps): JSX.Element {
  const [RemoteComponent, setRemoteComponent] =
    React.useState<React.Component | null>(null);

  const [error, setError] = React.useState<Error | null>(null);

  const setComponent = React.useCallback(async () => {
    try {
      if (typeof openRemoteComponent === 'function') {
        const rsc = await openRemoteComponent(source);
        return setRemoteComponent(() => rsc);
      }
      throw new Error(`[RemoteComponent]: typeof openRSC should be function`);
    } catch (e) {
      setRemoteComponent(() => null);
      setError(e as Error);
    }
  }, [source, openRemoteComponent]);

  React.useEffect(() => {
    setComponent();
  }, [setComponent]);

  const FallbackComponent = React.useCallback((): JSX.Element => {
    if (fallbackComponent) {
      return fallbackComponent;
    }
    return <></>;
  }, [fallbackComponent]);

  const ErrorComponent = React.useCallback((): JSX.Element => {
    if (errorComponent) {
      return errorComponent;
    }
    return <></>;
  }, [errorComponent]);

  const LoadingComponent = React.useCallback((): JSX.Element => {
    if (loadingComponent) {
      return loadingComponent;
    }
    return <></>;
  }, [loadingComponent]);

  if (typeof RemoteComponent === 'function') {
    return (
      <React.Fragment>
        <React.Suspense fallback={<FallbackComponent />} />
        {/* @ts-ignore */}
        <RemoteComponent {...extras} />
      </React.Fragment>
    );
  } else if (error) {
    return <ErrorComponent />;
  }
  return <LoadingComponent />;
}
