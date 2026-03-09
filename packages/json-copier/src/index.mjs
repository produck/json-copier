export function copy(value) {
	if (value === null || typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map(item => copy(item));
	}

	if (typeof value === 'object') {
		const result = {};

		for (const key of Object.keys(value)) {
			result[key] = copy(value[key]);
		}

		return result;
	}

	throw new TypeError(`The value type "${typeof value}" is not JSON compatible.`);
}