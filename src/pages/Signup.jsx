import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import InputTextError from "../components/Auth/InputTextError";
import { ReactComponent as EyeIcon } from "../assets/svg/EyeIcon.svg";
import { ReactComponent as EyeOffIcon } from "../assets/svg/EyeOffIcon.svg";
import { registrationSchema } from "../validations/SignupSchema";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={registrationSchema} onSubmit={onSubmit}>
      <Form className="form">
        <h1 className="text-primary text-center pb-20 text-4xl"> Sign up</h1>
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
            className="absolute top-8 right-0 pr-3 flex items-center text-gray-900"
          >
            {showPassword ? <EyeOffIcon className="w-5 h-5 " /> : <EyeIcon className="w-5 h-5 text-gray-400" />}
          </button>
          <ErrorMessage name="password" component={InputTextError} />
        </div>
        <div className="form-control relative">
          <label className="label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <Field
            className="input"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
          ></Field>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-8 right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? (
              <EyeOffIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <ErrorMessage name="confirmPassword" component={InputTextError} />
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
        <div className=" pt-3 flex gap-3 text-primary">
          <p className="">Already have an account? </p>
          <Link to={"/signin"}>
            <span className="hover:text-secondary">Login</span>
          </Link>
        </div>
      </Form>
    </Formik>
  );
};

export default Signup;
