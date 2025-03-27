import Handlebars from 'handlebars';

export const registerHelpers = (): void => {
	Handlebars.registerHelper(
		'eq',
		function (a: string | number, b: string | number) {
			return a === b;
		}
	);

	Handlebars.registerHelper(
		'neq',
		function (a: string | number, b: string | number) {
			return a !== b;
		}
	);

	Handlebars.registerHelper(
		'startsWith',
		function (
			this: string | object, // тип для контекста
			value: string,
			searchString: string
		): boolean {
			if (typeof value === 'string' && value.startsWith(searchString)) {
				return true; // Возвращаем true для успешного совпадения
			}
			return false; // Возвращаем false, если не совпадает
		}
	);

	Handlebars.registerHelper('formatTime', function (isoString: string): string {
		const date = new Date(isoString);
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	});

	Handlebars.registerHelper('notIn', function (arr: any, value: string) {
		// Проверяем, что `arr` — это массив, иначе возвращаем `true` (чтобы избежать ошибки)
		if (!Array.isArray(arr)) {
			console.warn('notIn helper: первый аргумент не является массивом', arr);
			return true;
		}

		return !arr.includes(value);
	});
};
