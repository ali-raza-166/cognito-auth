import InputTextError from "../components/Auth/InputTextError";
import { useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
const initialValues = {
  searchTerm: "",
};
const handleSubmit = (values) => {
  console.log(values);
};

const HomePage = () => {
  const searchItemSchema = Yup.object().shape({
    searchTerm: Yup.string().required("Required!"),
  });
  const navigate = useNavigate();
  const isLogggedIn = useSelector(getIsLoggedIn);
  useEffect(() => {
    if (!isLogggedIn) {
      navigate("/");
    }
  }, [isLogggedIn, navigate]);
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={searchItemSchema} onSubmit={handleSubmit}>
        <Form className="felx items-center justify-center sm:px-9 md:px-60 px- pt-10">
          <div className="flex items-center justify-center">
            <Field
              type="text"
              name="searchTerm"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-bl-lg rounded-tl-lg border-r  "
            />
            <button
              type="submit"
              className="bg-secondary hover:bg-primary text-primary hover:text-secondary px-4 py-2 rounded-tr-lg rounded-br-lg "
            >
              Search
            </button>
          </div>
          <ErrorMessage name="searchTerm" component={InputTextError} className="error" />
        </Form>
      </Formik>
    </>
  );
};

export default HomePage;
