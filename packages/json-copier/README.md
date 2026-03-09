# @produck/json-copier

A utility to deep copy JSON-compatible values.

## Installation

```bash
npm install @produck/json-copier
```

## Usage

### `copy(value)`

Deep copy a JSON-compatible value.

```javascript
import { copy } from "@produck/json-copier";

// Primitives are returned as-is
copy(null);       // null
copy(true);       // true
copy(42);         // 42
copy("hello");    // "hello"

// Arrays are deeply copied
const arr = [1, [2, 3], { a: 4 }];
const arrCopy = copy(arr);
arrCopy !== arr;          // true (different reference)
arrCopy[1] !== arr[1];    // true (nested array is also copied)

// Objects are deeply copied
const obj = { a: 1, b: { c: 2 }, d: [3, 4] };
const objCopy = copy(obj);
objCopy !== obj;          // true (different reference)
objCopy.b !== obj.b;      // true (nested object is also copied)

// Non-JSON-compatible values throw a TypeError
copy(undefined);          // TypeError
copy(() => {});           // TypeError
copy(Symbol("sym"));      // TypeError
```

## API

### `copy(value: JsonValue): JsonValue`

Recursively deep copies the given JSON-compatible value.

**Parameters:**

- `value` - Any JSON-compatible value: `null`, `boolean`, `number`, `string`, `Array`, or plain `Object`

**Returns:**

- A deep copy of the value. Primitives (`null`, `boolean`, `number`, `string`) are returned unchanged. Arrays and objects are recursively copied into new instances.

**Throws:**

- `TypeError` if the value contains non-JSON-compatible types such as `undefined`, `function`, or `symbol`

## License

MIT