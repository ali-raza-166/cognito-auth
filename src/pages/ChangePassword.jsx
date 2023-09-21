import { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { ChangePasswordSchema } from "../validations/ChangePasswordSchema";
import InputTextError from "../components/Auth/InputTextError";
import { ReactComponent as EyeIcon } from "../assets/svg/EyeIcon.svg";
import { ReactComponent as EyeOffIcon } from "../assets/svg/EyeOffIcon.svg";
import { changePassword, getUserEmail, getPasswordChanged, getAuthStatus } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const initialValues = {
  password: "",
  newPassword: "",
  confirmNewPassword: "",
};
const ChangePassword = () => {
  const [showOldPwd, setShowOldPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showNewCnfirmPwd, setShowNewCnfirmPwd] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(getUserEmail);
  const authStatus = useSelector(getAuthStatus);
  const passwordChanged = useSelector(getPasswordChanged);
  useEffect(() => {
    if (passwordChanged) {
      navigate("/");
    }
  }, [passwordChanged, navigate]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ChangePasswordSchema}
      onSubmit={(values) => dispatch(changePassword({ email: email, password: values.newPassword }))}
    >
      <Form className="form">
        <h1 className="text-primary text-center pb-20 text-4xl">Change Password</h1>
        <div className="form-control relative">
          <label className="label" htmlFor="password">
            Old Password
          </label>
          <Field className="input" type={showOldPwd ? "text" : "password"} id="password" name="password"></Field>
          <button
            type="button"
            onClick={() => setShowOldPwd(!showOldPwd)}
            className="absolute top-8 right-0 pr-3 flex items-center"
          >
            {showOldPwd ? (
              <EyeOffIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <ErrorMessage name="password" component={InputTextError} />
        </div>
        <div className="form-control relative">
          <label className="label" htmlFor="newPassword">
            New Password
          </label>
          <Field className="input" type={showNewPwd ? "text" : "password"} id="newPassword" name="newPassword"></Field>
          <button
            type="button"
            onClick={() => setShowNewPwd(!showNewPwd)}
            className="absolute top-8 right-0 pr-3 flex items-center"
          >
            {showNewPwd ? (
              <EyeOffIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <ErrorMessage name="newPassword" component={InputTextError} />
        </div>
        <div className="form-control relative">
          <label className="label" htmlFor="confirmNewPassword">
            Confirm New Password
          </label>
          <Field
            className="input"
            type={showNewCnfirmPwd ? "text" : "password"}
            id="confirmNewPassword"
            name="confirmNewPassword"
          ></Field>
          <button
            type="button"
            onClick={() => setShowNewCnfirmPwd(!showNewCnfirmPwd)}
            className="absolute top-8 right-0 pr-3 flex items-center"
          >
            {showNewCnfirmPwd ? (
              <EyeOffIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <ErrorMessage name="confirmNewPassword" component={InputTextError} />
        </div>
        <button type="submit" className="btn">
          {authStatus === "pending" ? "Loading..." : "Change Password"}
        </button>
      </Form>
    </Formik>
  );
};

export default ChangePassword;
