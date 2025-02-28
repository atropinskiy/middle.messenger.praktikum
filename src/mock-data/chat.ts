import { ChatModel } from "@models/chat";  // Предполагаем, что модель ChatModel находится здесь

// Моковые данные для ChatModel с участниками
export const MockChats: ChatModel[] = [
  {
    id: 'chat_1',
    participants: [
      { login: 'ivanivanov', avatar_url: 'avatar_url_ivan' },
      { login: 'andrey123', avatar_url: 'avatar_url_andrey' }
    ],
    messages: [
      {
        dateTime: new Date('2025-02-25T10:00:00'),
        from: { login: 'ivanivanov', avatar_url: 'avatar_url_ivan' },
        to: { login: 'andrey123', avatar_url: 'avatar_url_andrey' },
        message: 'Привет, как дела?',
      },
      {
        dateTime: new Date('2025-02-25T10:05:00'),
        from: { login: 'andrey123', avatar_url: 'avatar_url_andrey' },
        to: { login: 'ivanivanov', avatar_url: 'avatar_url_ivan' },
        message: 'Все отлично, а у тебя?',
      },
    ],
  },
  {
    id: 'chat_2',
    participants: [
      { login: 'admin', avatar_url: 'avatar_url_admin' },
      { login: 'ivanivanov', avatar_url: 'avatar_url_ivan' }
    ],
    messages: [
      {
        dateTime: new Date('2025-02-26T09:00:00'),
        from: { login: 'admin', avatar_url: 'avatar_url_admin' },
        to: { login: 'ivanivanov', avatar_url: 'avatar_url_ivan' },
        message: 'Не забудь обновить отчет к концу дня!',
      },
    ],
  },
  {
    id: 'chat_3',
    participants: [
      { login: 'alex_smith', avatar_url: 'avatar_url_alex' },
      { login: 'ivanivanov', avatar_url: 'avatar_url_ivan' }
    ],
    messages: [
      {
        dateTime: new Date('2025-02-27T15:30:00'),
        from: { login: 'alex_smith', avatar_url: 'avatar_url_alex' },
        to: { login: 'ivanivanov', avatar_url: 'avatar_url_ivan' },
        message: 'Когда будем встречаться по проекту?',
      },
    ],
  },
];
