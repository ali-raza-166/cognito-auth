import { Form, Formik, Field, ErrorMessage } from "formik";
// import { Link } from "react-router-dom";
import * as Yup from "yup";
import InputTextError from "../components/Auth/InputTextError";
const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };
  const onSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required!"),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className="form">
        <h1 className="text-primary text-center pb-20 text-4xl"> Forgot Password</h1>
        <div className="form-control">
          <label className="label" htmlFor="email">
            E-mail
          </label>
          <Field className="input" type="email" id="email" name="email" placeholder="abc@xyz.com" />
          <ErrorMessage name="email" component={InputTextError} />
        </div>
        <button type="submit" className="btn">
          Get Email
        </button>
      </Form>
    </Formik>
  );
};

export default ForgotPassword;
