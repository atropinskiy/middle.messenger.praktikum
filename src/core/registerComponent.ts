import Block from './block';
import Handlebars, { HelperOptions } from 'handlebars';

interface BlockConstructable<Props extends Record<string, any> = any> {
	new (props: Props): Block<Props>; // ✅ Ограничиваем Props
	componentName: string;
}

export default function registerComponent<Props extends Record<string, any>>(Component: BlockConstructable<Props>) {
	Handlebars.registerHelper(
		Component.componentName || Component.name,
		function (this: Props, { hash: { ref, ...hash }, data }: HelperOptions) {
			if (!data.root.children) {
				data.root.children = {};
			}

			if (!data.root.refs) {
				data.root.refs = {};
			}

			const { children, refs } = data.root;

			(Object.keys(hash) as any).forEach((key: keyof Props) => {
				if (this[key] && typeof this[key] === 'string') {
					hash[key] = hash[key].replace(new RegExp(`{{${String(key)}}}`, 'i'), this[key]);
				}
			});

			const component = new Component(hash);

			children[component.id] = component;

			if (ref) {
				refs[ref] = component;
			}

			return `<div data-id="id-${component.id}"></div>`;
		}
	);
}
