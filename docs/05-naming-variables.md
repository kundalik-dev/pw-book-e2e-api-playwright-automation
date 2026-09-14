Good catch — the **uppercase `Routes`** is not a technical requirement, it’s a **naming convention** that comes from industry practice. Let me explain why:

---

## 🔠 Why Uppercase for `Routes`

- In TypeScript/JavaScript, **PascalCase (uppercase first letter)** is commonly used for:
  - **Classes** (`LoginPage`, `UserService`)
  - **Constants objects** that act like enums (`Routes`, `Config`, `Errors`)
- By writing `Routes` instead of `routes`, you signal to other developers:
  - This is a **constant object**, not a variable that changes.
  - It’s meant to be imported and reused across the project.
  - It behaves like a **namespace** or **enum** of values.

---

## 🏗 Example

```ts
// routes.ts
export const Routes = {
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
};
```

Usage:

```ts
await expect(page).toHaveURL(Routes.register);
```

Here, `Routes.register` reads naturally, almost like an enum constant.

---

## ⚖️ Industry Standard POV

- ✅ **Uppercase (PascalCase)** → Used for shared constants, enums, config objects. Improves readability and signals immutability.
- ❌ **Lowercase (camelCase)** → Typically used for variables, function names, or objects that may change.

So while `routes` would technically work, `Routes` is clearer and more professional in a **scalable test framework**.

---

💡 In short: **Uppercase `Routes` is a convention to show it’s a constant config object, similar to an enum.** It makes your test code more readable and maintainable in team projects.

---

## Why loginPageData not LoginPageData

Great nuance, Kundalik — this is about **naming conventions** in TypeScript and how they signal intent.

---

## 🔹 `LoginPageData` vs `loginPageData`

### 1. **Type / Interface names → PascalCase**

- `LoginPageData` is a **type or interface** definition.
- Convention: **PascalCase** (uppercase first letter) for types, interfaces, classes, and enums.
- Example:
  ```ts
  interface LoginPageData {
    pageTitle: string;
    pageUrl: string;
    pageHeading: string;
  }
  ```

### 2. **Variable / constant names → camelCase**

- `loginPageData` is an **instance (object)** of that type.
- Convention: **camelCase** for variables and constants.
- Example:
  ```ts
  const loginPageData: LoginPageData = {
    pageTitle: "pw-books",
    pageUrl: "/login",
    pageHeading: "Log in",
  };
  ```

---

## ⚖️ Industry Standard POV

- **PascalCase** → used for _definitions_ (types, interfaces, classes).
- **camelCase** → used for _instances_ (objects, variables, functions).

This separation makes code instantly readable:

- If you see `LoginPageData`, you know it’s a **type contract**.
- If you see `loginPageData`, you know it’s a **specific object** that follows that contract.

---

## 🏗 Best Practice in Test Frameworks

- Keep **types/interfaces** in a `types.ts` or `models.ts` file.
- Keep **test data objects** in a `test-data.ts` file.
- Example:

  ```ts
  // types.ts
  export interface LoginPageData {
    pageTitle: string;
    pageUrl: string;
    pageHeading: string;
  }

  // test-data.ts
  import { LoginPageData } from "./types";

  export const loginPageData: LoginPageData = {
    pageTitle: "pw-books",
    pageUrl: "/login",
    pageHeading: "Log in",
  };
  ```

---

💡 In short:

- **Use `LoginPageData` (PascalCase)** for the **type definition**.
- **Use `loginPageData` (camelCase)** for the **object instance**.

That’s the clean, scalable, industry‑standard way.

---

## then why Routes not routes but loginPageData but not LoginPageData

This is a subtle but important distinction in naming conventions:

---

## 🔹 Why `Routes` (PascalCase) but `loginPageData` (camelCase)

### 1. **Constants / Namespaces → PascalCase**

- `Routes` is a **constant object** that acts like an **enum** or namespace.
- Industry convention: use **PascalCase** for things that are **global, immutable, and shared** across the project.
- Example:
  ```ts
  export const Routes = {
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
  };
  ```
  This signals: _“Routes is a central config object, not just a local variable.”_

---

### 2. **Variables / Instances → camelCase**

- `loginPageData` is a **specific instance of test data**.
- Convention: use **camelCase** for variables, objects, and function names.
- Example:
  ```ts
  const loginPageData: LoginPageData = {
    pageTitle: "pw-books",
    pageUrl: "/login",
    pageHeading: "Log in",
  };
  ```
  This signals: _“loginPageData is a local object following the LoginPageData type.”_

---

### ⚖️ Industry Standard POV

- **PascalCase** → for **types, classes, enums, and global constants** (things that define structure or act like namespaces).
- **camelCase** → for **variables, instances, and functions** (things that represent actual data or behavior).

So:

- `LoginPageData` → type definition (PascalCase).
- `loginPageData` → instance of that type (camelCase).
- `Routes` → global constant object (PascalCase, treated like an enum).

---

💡 Think of it this way:

- **PascalCase** = “definition or global constant”
- **camelCase** = “instance or local variable”

---
