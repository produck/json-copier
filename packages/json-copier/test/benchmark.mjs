import { copy } from '../src/index.mjs';

const obj = {
	name: 'demo',
	items: [1, 2, { ok: true }],
	meta: { count: 3 },
	deep: Array.from({ length: 1000 }, (_, i) => ({
		n: i,
		arr: [i, i + 1, { v: i }],
	})),
};

const iterations = 10000;

console.log('Benchmark: copy vs structuredClone');

console.time('copy');
for (let i = 0; i < iterations; i++) {
	copy(obj);
}
console.timeEnd('copy');

console.time('structuredClone');
for (let i = 0; i < iterations; i++) {
	structuredClone(obj);
}
console.timeEnd('structuredClone');
