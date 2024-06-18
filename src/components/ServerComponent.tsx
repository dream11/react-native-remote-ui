import * as React from 'react';
import { type RSCProps } from '../@types';

export default function RSC({
  source,
  openRSC,
  fallbackComponent,
  loadingComponent = <React.Fragment />,
  errorComponent = <React.Fragment />,
  ...extras
}: RSCProps): JSX.Element {
  const [ServerComponent, setServerComponent] =
    React.useState<React.Component | null>(null);

  const [error, setError] = React.useState<Error | null>(null);

  const setComponent = React.useCallback(async () => {
    try {
      if (typeof openRSC === 'function') {
        const rsc = await openRSC(source);
        return setServerComponent(() => rsc);
      }
      throw new Error(`[ServerComponent]: typeof openRSC should be function`);
    } catch (e) {
      setServerComponent(() => null);
      setError(e as Error);
    }
  }, [source, openRSC]);

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

  if (typeof ServerComponent === 'function') {
    return (
      <React.Fragment>
        <React.Suspense fallback={<FallbackComponent />} />
        {/* @ts-ignore */}
        <ServerComponent {...extras} />
      </React.Fragment>
    );
  } else if (error) {
    return <ErrorComponent />;
  }
  return <LoadingComponent />;
}
