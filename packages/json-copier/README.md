# @produck/json-copier

A tiny utility to deep copy JSON-compatible values.

## Installation

```bash
npm install @produck/json-copier
```

## Usage

```javascript
import { copy } from '@produck/json-copier';

const value = {
	name: 'demo',
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

## License

MIT
