import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { copy } from '../src/index.mjs';

// JSON primitive fixtures
const primitives = [
	{ name: 'null', value: null },
	{ name: 'true', value: true },
	{ name: 'false', value: false },
	{ name: 'integer', value: 42 },
	{ name: 'float', value: 3.14 },
	{ name: 'empty string', value: '' },
	{ name: 'string', value: 'hello' },
];

describe('copy', () => {
	describe('primitives', () => {
		for (const fixture of primitives) {
			it(`should return the same primitive value for - ${fixture.name}`, () => {
				assert.equal(copy(fixture.value), fixture.value);
			});
		}
	});

	describe('arrays', () => {
		it('should deep copy an empty array', () => {
			const original = [];
			const result = copy(original);

			assert.deepEqual(result, original);
			assert.notEqual(result, original);
		});

		it('should deep copy an array of primitives', () => {
			const original = [1, 'two', true, null];
			const result = copy(original);

			assert.deepEqual(result, original);
			assert.notEqual(result, original);
		});

		it('should deep copy nested arrays', () => {
			const original = [[1, 2], [3, 4]];
			const result = copy(original);

			assert.deepEqual(result, original);
			assert.notEqual(result, original);
			assert.notEqual(result[0], original[0]);
		});
	});

	describe('objects', () => {
		it('should deep copy an empty object', () => {
			const original = {};
			const result = copy(original);

			assert.deepEqual(result, original);
			assert.notEqual(result, original);
		});

		it('should deep copy a flat object', () => {
			const original = { a: 1, b: 'two', c: true, d: null };
			const result = copy(original);

			assert.deepEqual(result, original);
			assert.notEqual(result, original);
		});

		it('should deep copy a nested object', () => {
			const original = { a: { b: { c: 42 } } };
			const result = copy(original);

			assert.deepEqual(result, original);
			assert.notEqual(result, original);
			assert.notEqual(result.a, original.a);
			assert.notEqual(result.a.b, original.a.b);
		});

		it('should deep copy an object containing arrays', () => {
			const original = { items: [1, 2, 3], meta: { count: 3 } };
			const result = copy(original);

			assert.deepEqual(result, original);
			assert.notEqual(result.items, original.items);
			assert.notEqual(result.meta, original.meta);
		});
	});

});
