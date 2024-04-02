import * as React from 'react';
import { type RSCProps } from '../@types';

export default function RSC({
  source,
  openRSC,
  fallbackComponent,
  loadingComponent = () => <React.Fragment />,
  errorComponent = () => <React.Fragment />,
  ...extras
}: RSCProps): JSX.Element {
  const [ServerComponent, setServerComponent] =
    React.useState<React.Component | null>(null);

  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        if (typeof openRSC === 'function') {
          const rsc = await openRSC(source);
          return setServerComponent(() => rsc);
        }
        throw new Error(`[ServerComponent]: typeof openRSC should be function`);
      } catch (e) {
        setServerComponent(() => null);
        setError(e);
      }
    })();
  }, [source, openRSC]);

  const FallbackComponent = React.useCallback((): JSX.Element => {
    if (fallbackComponent) {
      return fallbackComponent();
    }
    return <></>;
  }, [fallbackComponent]);

  if (typeof ServerComponent === 'function') {
    return (
      <React.Fragment>
        <React.Suspense fallback={<FallbackComponent />} />
        {/* @ts-ignore */}
        <ServerComponent {...extras} />
      </React.Fragment>
    );
  } else if (error) {
    return errorComponent();
  }
  return loadingComponent();
}
