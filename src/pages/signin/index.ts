import { renderDOM } from '@core/renderDom';
import { registerComponent } from '@core/registerComponent';

import SigninPage from './signin';
import Button from 'components/button';


document.addEventListener('DOMContentLoaded', () => {
	registerComponent(Button);
  
});