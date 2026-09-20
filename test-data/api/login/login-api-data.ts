// login api test data and types

interface Credentials {
  email: string;
  password: string;
}

interface Error {
  message: string;
  code: string;
}

interface ValidLoginCase extends Credentials {
  loginUserName: string;
}

interface InvalidLoginCase extends Credentials {
  testCase: string;
  statusCode: number;
  error: Error;
}

interface LoginUsers {
  validUser: ValidLoginCase;
  inValidUser: InvalidLoginCase[];
}

const loginUsers: LoginUsers = {
  validUser: {
    email: "kundalik.dev@gmail.com",
    password: "Admin@123",
    loginUserName: "kundalik",
  },

  inValidUser: [
    {
      testCase: "email and password are incorrect",
      email: "wrong-email@gmail.com",
      password: "Wrong-Password",
      statusCode: 401,
      error: {
        message: "Invalid email or password.",
        code: "INVALID_CREDENTIALS",
      },
    },
  ],
};

export { loginUsers };
