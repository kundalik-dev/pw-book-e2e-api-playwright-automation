import envConfig from "../../env/env-config";

// Login Page Basic data types and data
interface LoginPageData {
  pageTitle: string;
  pageUrl: string;
  pageHeading: string;
  registerLinkText: string;
}

const loginPageData: LoginPageData = {
  pageTitle: "pw-books",
  pageUrl: "/login",
  pageHeading: "Log in",
  registerLinkText: "Register",
};

// Multiple valid & invalid users data
interface Credentials {
  userEmail: string;
  password: string;
}

interface ValidLoginCase extends Credentials {
  loggedInUserName: string;
}

interface InvalidLoginCase extends Credentials {
  testCase: string;
  emailErrorMessage?: string;
  passwordErrorMessage?: string;
}

interface LoginData {
  valid: ValidLoginCase;
  inValid: InvalidLoginCase[];
}

const loginUsers: LoginData = {
  valid: {
    // Pulled from .env via env/qa-env.ts or env/prod-env.ts (EMAIL / PASSWORD)
    userEmail: envConfig.validEmail,
    password: envConfig.validPassword,
    loggedInUserName: "kundalik jadhav",
  },
  inValid: [
    {
      testCase: "email and password are empty",
      userEmail: "",
      password: "",
      emailErrorMessage: "Enter a valid email address.",
      passwordErrorMessage: "Password is required.",
    },
    {
      testCase: "password is empty",
      userEmail: "valid@example.com",
      password: "",
      passwordErrorMessage: "Password is required.",
    },
    {
      testCase: "email is empty",
      userEmail: "",
      password: "correct-password",
      emailErrorMessage: "Enter a valid email address.",
    },
    {
      testCase: "email and password are incorrect",
      userEmail: "invalid@example.com",
      password: "wrong-password",
    },
  ],
};

export { loginPageData, loginUsers };
