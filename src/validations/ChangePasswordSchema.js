import * as Yup from "yup";
export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number"),
  newPassword: Yup.string()
    .required("Confirm Password is required!")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "New Passwords must match")
    .required("Confirm New password is required"),
});
