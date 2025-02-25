import { renderDOM } from '@core/renderDom';
import { registerComponent } from '@core/registerComponent';
import { Button } from  '@components/index';
import { SignIn } from './pages/index';


document.addEventListener('DOMContentLoaded', () => {
	registerComponent(Button);


	renderDOM(new SignIn());
});