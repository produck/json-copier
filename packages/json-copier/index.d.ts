/**
 * JSON-compatible primitive values
 */
type JsonPrimitive = null | boolean | number | string;

/**
 * JSON-compatible array values
 */
type JsonArray = JsonValue[];

/**
 * JSON-compatible object values
 */
type JsonObject = { [key: string]: JsonValue };

/**
 * Any JSON-compatible value
 */
type JsonValue = JsonPrimitive | JsonArray | JsonObject;

/**
 * Deep copy a JSON-compatible value
 * @param value - The JSON-compatible value to copy
 * @returns A deep copy of the value
 * @throws {TypeError} If the value is not JSON-compatible
 */
export function copy(value: JsonValue): JsonValue;