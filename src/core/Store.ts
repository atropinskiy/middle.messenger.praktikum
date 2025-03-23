import EventBus from "./eventBus";
import { IChatItem, IChatMessage, UserDTO } from "api/type";

interface TState {
  isLogged: boolean | null
  isLoading: boolean
  user: UserDTO | null
  loginError: string
  isModalOpen: boolean
  chats: IChatItem[]
  currentMessages: IChatMessage[]
}

export enum StoreEvents {
  Updated = "Updated",
}

export class Store extends EventBus {
  private static __instance: Store;
  private state!: TState;

  constructor(defaultState: TState) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();
    
    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState():TState  {
    return this.state;
  }

  public set(nextState: Partial<TState>): void {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
