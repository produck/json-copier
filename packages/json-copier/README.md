# @produck/json-copier

A tiny utility to deep copy JSON-compatible values.

## Installation

```bash
npm install @produck/json-copier
```

## Usage

```javascript
import { copy } from "@produck/json-copier";

const value = {
	name: "demo",
	items: [1, 2, { ok: true }],
	meta: { count: 3 },
};

const cloned = copy(value);

console.log(cloned); // same structure
console.log(cloned === value); // false
console.log(cloned.items === value.items); // false
console.log(cloned.meta === value.meta); // false
```

## API

### `copy(value: JsonValue): JsonValue`

Deep copy a JSON-compatible value.

- Primitive values (`null`, `boolean`, `number`, `string`) are returned
  as-is.
- Arrays are copied recursively.
- Objects are copied recursively.

## Input Contract

`copy` is designed for JSON-compatible input only.

- Supported input types: `null`, `boolean`, `number`, `string`, `Array`,
  and plain JSON objects.
- This package does **NOT** perform runtime validation for unsupported
  types.

## Where Valid JSON Objects Come From

In practice, inputs passed to `copy` commonly come from one of these
trusted sources:

1. Fully validated runtime objects

   Objects that have already gone through sufficient runtime checks
   (for example, schema validation, guard functions, or strict data
   sanitization) and are known to be JSON-compatible.

2. Standard JSON-producing pipelines

   Data produced by methods that return standard JSON objects, such as
   `JSON.parse(...)` and processing chains built on top of its result.

## Benchmark

To compare performance with the native `structuredClone`, a benchmark was run
using a moderately complex JSON object and 10,000 iterations for each method.

**Test data overview:**

The benchmark object contains a flat section (`name`, `items`, `meta`) and a
`deep` array of 1,000 elements. Each element is a small object with a nested
array containing two numbers and one object, resulting in roughly **4,000+
nested values** per copy operation.

**Benchmark source** (`test/benchmark.mjs`):

```javascript
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
```

**Result (Node.js 18+, Windows):**

```
Benchmark: copy vs structuredClone
copy: ~857ms
structuredClone: ~9.5s
```

**Conclusion:**

For pure JSON data, `copy` is significantly faster than `structuredClone`
(about 10x in this scenario). If you only need to handle JSON-compatible values,
this package is a lightweight and high-performance choice.

> Note: [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
> is a built-in API that supports a much wider range of types, including
> `Date`, `RegExp`, `Map`, `Set`, `ArrayBuffer`, `Blob`, and objects with
> circular references. If your data includes any of these types,
> `structuredClone` is the appropriate choice. This package is designed
> exclusively for JSON-compatible data, where its simplicity and performance
> are the primary advantages.

## License

MIT
