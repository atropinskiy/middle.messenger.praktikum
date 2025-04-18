type PlainObject<T = unknown> = {
	[k in string]: T;
};

function isPlainObject<T = unknown>(value: unknown): value is PlainObject<T> {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.constructor === Object &&
		Object.prototype.toString.call(value) === '[object Object]'
	);
}

function isArray<T = unknown>(value: unknown): value is T[] {
	return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is PlainObject | unknown[] {
	return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject): boolean {
	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}

	for (const [key, value] of Object.entries(lhs)) {
		const rightValue = rhs[key];

		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			if (isEqual(value as PlainObject, rightValue as PlainObject)) {
				continue;
			}
			return false;
		}

		if (value !== rightValue) {
			return false;
		}
	}

	return true;
}

export default isEqual;
