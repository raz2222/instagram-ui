import * as Yup from "yup";
import config from "../config/index";

export const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username is too short")
    .max(16, "Username is too long")
    .required("Username is required")
    .test("isUnique", "Username is already taken", (value) =>
      isUnique("username", value)
    ),
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required")
    .test("isUnique", "Email is in use", (value) => isUnique("email", value)),
  password: Yup.string()
    .min(6, "Password is too short")
    .max(16, "Password is too long")
    .required("Password is required"),
  agreeTerms: Yup.boolean().oneOf([true], "You must agree to terms"),
});

const memo = {
  email: {},
  username: {},
};

async function isUnique(field, value) {
  if (memo[field].hasOwnProperty(value)) {
    return memo[field][value];
  }
  const res = await fetch(`${config.apiUrl}/users/check?${field}=${value}`);
  memo[field][value] = !(await res.json());
  return memo[field][value];
}
