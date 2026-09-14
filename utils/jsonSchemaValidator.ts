import Ajv, { type ErrorObject, type ValidateFunction } from "ajv";

const ajv = new Ajv({ allErrors: true, strict: false });
const compiledSchemas = new WeakMap<object, ValidateFunction>();

function getValidator(schema: object): ValidateFunction {
  let validate = compiledSchemas.get(schema);
  if (!validate) {
    validate = ajv.compile(schema);
    compiledSchemas.set(schema, validate);
  }
  return validate;
}

function formatErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors?.length) return "Unknown validation error";
  return errors
    .map((e) => `- ${e.instancePath || "/"} ${e.message ?? "is invalid"}`)
    .join("\n");
}

/**
 * Validates data against a JSON schema.
 * Throws with a readable error list on failure (better Playwright reports).
 */
function assertJsonSchema(schema: object, data: unknown): void {
  const validate = getValidator(schema);
  if (!validate(data)) {
    throw new Error(`JSON schema validation failed:\n${formatErrors(validate.errors)}`);
  }
}

/**
 * Validates data against a JSON schema.
 * @returns true when valid; false when invalid (errors logged via return path for callers that need a boolean)
 */
function jsonSchemaValidator(schema: object, data: unknown): boolean {
  const validate = getValidator(schema);
  return validate(data);
}

export { assertJsonSchema, jsonSchemaValidator };
