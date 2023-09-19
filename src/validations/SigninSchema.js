import * as Yup from "yup";
export const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address!").required("Required!"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number"),
});
