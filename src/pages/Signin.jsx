import { useState, useEffect } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
// import { Link } from "react-router-dom";
import InputTextError from "../components/Auth/InputTextError";
import { ReactComponent as EyeIcon } from "../assets/svg/EyeIcon.svg";
import { ReactComponent as EyeOffIcon } from "../assets/svg/EyeOffIcon.svg";
import { SigninSchema } from "../validations/SigninSchema";
import { loginUser, getIsLoggedIn, getAuthStatus, getFirstLogin } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const initialValues = {
  email: "",
  password: "",
};

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLogggedIn = useSelector(getIsLoggedIn);
  const authStatus = useSelector(getAuthStatus);
  const firstLogin = useSelector(getFirstLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (firstLogin) {
    navigate("/changepassword");
  }
  useEffect(() => {
    if (isLogggedIn) {
      navigate("/home");
    }
  }, [isLogggedIn, navigate]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SigninSchema}
      onSubmit={(values) => dispatch(loginUser({ email: values.email, password: values.password }))}
    >
      <Form className="form">
        <h1 className="text-primary text-center pb-20 text-4xl"> Sign in</h1>
        <div className="form-control">
          <label className="label" htmlFor="email">
            E-mail
          </label>
          <Field className="input" type="email" id="email" name="email" placeholder="abc@xyz.com" />
          <ErrorMessage name="email" component={InputTextError} />
        </div>
        <div className="form-control relative">
          <label className="label" htmlFor="password">
            Password
          </label>
          <Field className="input" type={showPassword ? "text" : "password"} id="password" name="password"></Field>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-8 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <ErrorMessage name="password" component={InputTextError} />
        </div>
        <button type="submit" className="btn">
          {authStatus === "pending" ? "Signing in..." : "Sign in"}
        </button>
        {authStatus === "failed" && <p className="error text-center">Invalid Email or Password</p>}
        {authStatus === "rejected" && <p className="error text-center">Unknown Error</p>}
      </Form>
    </Formik>
  );
};

export default Signin;
