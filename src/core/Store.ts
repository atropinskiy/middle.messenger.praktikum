import EventBus from "./eventBus";

interface TState {
  isLogged: boolean
  isLoading: boolean
  user: TUser | null
  loginError: string
}

export enum StoreEvents {
  Updated = "Updated",
}

export class Store extends EventBus {
  private static __instance: Store;
  private state = {};

  constructor(defaultState: TState) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<TState>): void {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
