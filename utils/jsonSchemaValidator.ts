import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv({ allErrors: true });

/**
 * Validates a JSON response against a given schema.
 * @param schema - The JSON schema definition
 * @param jsonBody - The actual API response to validate
 * @returns true if valid, false otherwise
 */
function jsonSchemaValidator<T>(
  schema: JSONSchemaType<T>,
  jsonBody: unknown,
): boolean {
  const validate = ajv.compile(schema);
  const isValid = validate(jsonBody);

  if (!isValid) {
    console.error("Schema validation failed:", validate.errors);
  }

  return isValid;
}

export { jsonSchemaValidator };
