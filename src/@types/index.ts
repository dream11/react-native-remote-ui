export type RSCConfig = {
  readonly global?: any;
};

export type RSCSource =
  | {
      readonly uri: string;
    }
  | string;

export type RSCActions = 'NAVIGATE' | 'IO' | 'STATE_CHANGE';

export type RSCProps = {
  readonly source: RSCSource;
  readonly fallbackComponent?: () => JSX.Element;
  readonly loadingComponent?: () => JSX.Element;
  readonly errorComponent?: () => JSX.Element;
  readonly onError?: (error: Error) => void;
  readonly navigationRef?: React.Ref<any>;
  readonly onAction?: (
    action: RSCActions,
    payload: Record<string, any>
  ) => void;
  readonly openRSC?: (source: RSCSource) => Promise<React.Component>;
};

export type RSCPromise<T> = {
  readonly resolve: (result: T) => void;
  readonly reject: (error: Error) => void;
};
