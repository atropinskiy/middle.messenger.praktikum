import Block from './block';

export function renderDOM(block: Block<any>) {
	const root = document.querySelector('#app');

	root!.innerHTML = '';
	root!.appendChild(block.getContent());
}