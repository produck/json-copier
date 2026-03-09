function isPrimitive(value) {
	return value === null || typeof value !== 'object';
}

export function copy(value) {
	if (isPrimitive(value)) {
		return value;
	}

	if (Array.isArray(value)) {
		const result = new Array(value.length);

		for (let index = 0; index < value.length; index += 1) {
			result[index] = copy(value[index]);
		}

		return result;
	}

	const result = {};

	for (const key in value) {
		result[key] = copy(value[key]);
	}

	return result;
}
