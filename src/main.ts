import SignIn from './pages/signin/signin';  // импорт страницы

document.addEventListener('DOMContentLoaded', () => {
  const signInPage = new SignIn({});  // создаем экземпляр компонента страницы
  const appContainer = document.getElementById('app');  // находим контейнер с id="app"
  
  if (appContainer) {
    appContainer.append(signInPage.getContent());  // добавляем страницу в контейнер
  }
});
