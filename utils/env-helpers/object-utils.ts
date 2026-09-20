// Checks if an object has a specific key as its own property
export function hasOwnKey<T extends object>(
  object: T,
  key: PropertyKey,
): key is keyof T {
  return Object.prototype.hasOwnProperty.call(object, key);
}
