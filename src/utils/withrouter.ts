import Block from '@core/block';  // Импорт Block (если он в другом файле)

type WithRouterProps = {
  router: typeof window.router;
};

export function withRouter<TProps extends Record<string, any>>(WrappedBlock: typeof Block<TProps>) {
  return class extends WrappedBlock {
    constructor(props: TProps & WithRouterProps) {
      super({ ...props, router: window.router });
    }
  };
}
