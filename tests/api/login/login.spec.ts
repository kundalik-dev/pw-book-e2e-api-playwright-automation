import { test, expect } from "@playwright/test";
import { PostLoginBody } from "../../../types/api/login";
import { postLoginUser } from "../../../utils/api/login.api";
import { assertJsonSchema } from "../../../utils/jsonSchemaValidator";
import loginBodySchema from "../../../test-data/api/login/login.post.json";
const data: PostLoginBody = {
  email: "kundalik.dev@gmail.com",
  password: "Admin@123",
};

test.describe("POST /login @api @smoke @login", () => {
  test("should login with valid credential", async ({ request }) => {
    const { response, body } = await postLoginUser(request, data);
    expect(response.status()).toBe(200);
    assertJsonSchema(loginBodySchema, body);

    expect();
  });
});
