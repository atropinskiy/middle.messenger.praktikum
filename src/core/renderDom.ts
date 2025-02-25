import Block from './block';

export default function renderDOM(block: Block<any>) {
	const root = document.querySelector('#app');

	if (!root) {
		throw new Error('Root element not found');
	}

	root.innerHTML = '';
	root.appendChild(block.getContent());
}
