import EventBus from '@core/eventBus';

export interface StateTypes {
  user: string,
  isLogged: boolean
}

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: unknown
) => void;

export type Action<State> = (dispatch: Dispatch<State>, state: State, payload?: unknown) => void;

export class Store<State extends Record<string, any>> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();
    this.state = defaultState;
    this.set(defaultState);
  }

  public getState(): State {
    return this.state;
  }

  public set(nextState: Partial<State>): void {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...nextState };
    this.emit('changed', prevState, nextState);
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: unknown): void {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set({ ...this.state, ...nextStateOrAction });
    }
  }
}
