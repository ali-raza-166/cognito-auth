import InputTextError from "../components/Auth/InputTextError";
import { useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { getIsLoggedIn, getAccessToken } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { fetchSimilarDocs, getData, getDataSliceError, getDataSliceStatus } from "../store/slices/dataSlice";

const initialValues = {
  searchTerm: "",
};

const HomePage = () => {
  const searchItemSchema = Yup.object().shape({
    searchTerm: Yup.string().required("Required!"),
  });
  // const accessToken = useSelector(getAccessToken);
  const apiData = useSelector(getData);
  const dataSliceStatus = useSelector(getDataSliceStatus);
  // const dataSliceError = useSelector(getDataSliceError);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLogggedIn = useSelector(getIsLoggedIn);
  useEffect(() => {
    if (!isLogggedIn) {
      navigate("/");
    }
  }, [isLogggedIn, navigate]);
  // const errorContent = dataSliceStatus === "failed" ? dataSliceError : null;
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={searchItemSchema}
        onSubmit={(values) => dispatch(fetchSimilarDocs({ q: values.searchTerm, verbose: true }))}
      >
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
              {dataSliceStatus === "pending" ? "Loading..." : "Search"}
            </button>
          </div>
          <ErrorMessage name="searchTerm" component={InputTextError} className="error" />
        </Form>
      </Formik>
      <div>
        <p>{apiData}</p>
      </div>
    </>
  );
};

export default HomePage;
