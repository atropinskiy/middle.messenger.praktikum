import EventBus from "./eventBus";
import { IChatItem, IChatMessage, TChatUser, UserDTO } from "api/type";

interface TState {
  isLogged: boolean | null
  isLoading: boolean
  user: UserDTO | null
  loginError: string
  openedModal: 'createChat' | 'addUser' | false
  chats: IChatItem[]
  currentMessages: IChatMessage[]
  currentChatId: number
  currentChatUsers: TChatUser[]
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
