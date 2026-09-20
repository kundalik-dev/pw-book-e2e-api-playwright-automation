// login api test data and types
import envConfig from "../../../env/env-config";
import { LoginRequest } from "../../../types/api/login-types";

type ValidLoginCase = LoginRequest & {
  expectedName: string; // optional assert helper
};

type InvalidLoginCase = LoginRequest & {
  testCase: string;
  expectedStatus: number;
  expectedError: {
    message: string; // or use toContain if message varies
    code: string;
  };
};

type LoginTestData = {
  valid: ValidLoginCase;
  invalid: InvalidLoginCase[];
};

const loginUsers: LoginTestData = {
  valid: {
    email: envConfig.validEmail,
    password: envConfig.validPassword,
    expectedName: "kundalik jadhav",
  },

  invalid: [
    {
      testCase: "email and password are incorrect",
      email: "wrong-email@gmail.com",
      password: "Wrong-Password",
      expectedStatus: 401,
      expectedError: {
        message: "Invalid email or password.",
        code: "INVALID_CREDENTIALS",
      },
    },
    {
      testCase: "email and password are empty",
      email: "",
      password: "",
      expectedStatus: 400,
      expectedError: {
        message: "Invalid email address, Password is required",
        code: "VALIDATION_ERROR",
      },
    },
    {
      testCase: "email is empty",
      email: "",
      password: "wrong-password",
      expectedStatus: 400,
      expectedError: {
        message: "Invalid email address",
        code: "VALIDATION_ERROR",
      },
    },
    {
      testCase: "password is empty",
      email: "kundalik.dev@gmail.com",
      password: "",
      expectedStatus: 400,
      expectedError: {
        message: "Password is required",
        code: "VALIDATION_ERROR",
      },
    },
    {
      testCase: "incorrect email format",
      email: "kundalik.dev-gmail.com",
      password: "somePass1!",
      expectedStatus: 400,
      expectedError: {
        message: "Invalid email address",
        code: "VALIDATION_ERROR",
      },
    },
  ],
};

export { loginUsers };
