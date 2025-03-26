/* eslint-disable */
import Block from "@core/block";
import { StoreEvents } from "../core/Store";
import isEqual from "./isEqual";

type MapStateToProps<S, P> = (state: S) => P;

export function connect<
  TProps extends Record<string, any> = {},
  TState extends Record<string, any> = {},
  S = any,
  P extends Record<string, any> = {}
>(mapStateToProps: MapStateToProps<S, P>) {
  return function (Component: typeof Block<TProps, TState>) {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props: TProps) {
        const store = window.store;
        let state = mapStateToProps(store.getState() as S);
        super({ ...props, ...state });
        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState() as S);
          if (!isEqual(state, newState)) {
            console.log("⚡ Состояние изменилось, обновляем props!", newState);
            this.setProps({ ...newState });
          } else {
          }
        
          state = newState;
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    } as typeof Block<TProps, TState>;
  };
}
