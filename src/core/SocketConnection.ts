import { CONSTATNS } from '@utils/constants';



export default class SocketConnection {
  protected socket;
  protected timerId?: NodeJS.Timeout;

  constructor(endpoint: string) {
    this.socket = new WebSocket(`${CONSTATNS.BASE_SOCKET_URL}${endpoint}`);
    this.timerId;
    this.init();
  }

  private init() {
    this.setListeners();
  }

  private setListeners() {
    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      clearInterval(this.timerId);
      this.setPing();
      this.getPrevMessages('0');
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
        window.store.set({currentMessages: []});
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data && data.type !== 'error' && data.type !== 'pong' && data.type !== 'user connected') {
        const store = window.store
        if (Array.isArray(data)) {
          store.set({ currentMessages: data })
        } else {
          window.store.set({ currentMessages: [...store.getState().currentMessages, data] })
        }
      }
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', event);
    });
  }

  public closeConnection() {
    if (this.socket) {
      this.socket.close();
    }
  }

  public sendMessage(message: string) {
    this.socket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      })
    );
  }

  public getPrevMessages(count: string) {
    this.socket.send(
      JSON.stringify({
        content: count,
        type: 'get old',
      })
    );
  }

  private setPing() {
    this.timerId = setInterval(() => {
      this.socket.send(JSON.stringify({ type: 'ping' }));
    }, 2000);
  }
}
