import Block from '@core/block';

type WithRouterProps = {
  router: typeof window.router;
};

export function withRouter<
  TProps extends Record<string, any> = {},
  TState extends Record<string, any> = {}
>(WrappedBlock: typeof Block<TProps, TState>) {
  return class extends WrappedBlock {
    constructor(props: TProps & WithRouterProps) {
      super({ ...props, router: window.router });
    }
  } as typeof Block<TProps, TState>;
}
