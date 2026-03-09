import { describe, it } from 'node:test';
import assert from 'node:assert';
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

// Non-JSON-compatible values
const nonJsonValues = [
	{ name: 'undefined', value: undefined },
	{ name: 'function', value: () => {} },
	{ name: 'symbol', value: Symbol('sym') },
];

/**
 * Helper function to run parameterized tests
 */
function testCases(testName, fn, fixtures) {
	for (const fixture of fixtures) {
		it(`${testName} - ${fixture.name}`, () => {
			fn(fixture.value);
		});
	}
}

describe('copy', () => {
	describe('primitives', () => {
		testCases(
			'should return the same primitive value for',
			(value) => {
				assert.strictEqual(copy(value), value);
			},
			primitives,
		);
	});

	describe('arrays', () => {
		it('should deep copy an empty array', () => {
			const original = [];
			const result = copy(original);

			assert.deepStrictEqual(result, original);
			assert.notStrictEqual(result, original);
		});

		it('should deep copy an array of primitives', () => {
			const original = [1, 'two', true, null];
			const result = copy(original);

			assert.deepStrictEqual(result, original);
			assert.notStrictEqual(result, original);
		});

		it('should deep copy nested arrays', () => {
			const original = [[1, 2], [3, 4]];
			const result = copy(original);

			assert.deepStrictEqual(result, original);
			assert.notStrictEqual(result, original);
			assert.notStrictEqual(result[0], original[0]);
		});
	});

	describe('objects', () => {
		it('should deep copy an empty object', () => {
			const original = {};
			const result = copy(original);

			assert.deepStrictEqual(result, original);
			assert.notStrictEqual(result, original);
		});

		it('should deep copy a flat object', () => {
			const original = { a: 1, b: 'two', c: true, d: null };
			const result = copy(original);

			assert.deepStrictEqual(result, original);
			assert.notStrictEqual(result, original);
		});

		it('should deep copy a nested object', () => {
			const original = { a: { b: { c: 42 } } };
			const result = copy(original);

			assert.deepStrictEqual(result, original);
			assert.notStrictEqual(result, original);
			assert.notStrictEqual(result.a, original.a);
			assert.notStrictEqual(result.a.b, original.a.b);
		});

		it('should deep copy an object containing arrays', () => {
			const original = { items: [1, 2, 3], meta: { count: 3 } };
			const result = copy(original);

			assert.deepStrictEqual(result, original);
			assert.notStrictEqual(result.items, original.items);
			assert.notStrictEqual(result.meta, original.meta);
		});
	});

	describe('non-JSON-compatible values', () => {
		testCases(
			'should throw TypeError for',
			(value) => {
				assert.throws(() => copy(value), TypeError);
			},
			nonJsonValues,
		);
	});
});