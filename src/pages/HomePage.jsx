import InputTextError from "../components/Auth/InputTextError";
import { useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { getIsLoggedIn, getAccessToken } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { fetchSimilarDocs, getData, getDataSliceStatus } from "../store/slices/dataSlice";
import DisplayData from "../components/HomeComponents/DisplayData";
import Card from "../components/UI/Card";
import { dataSliceActions } from "../store/slices/dataSlice";
const initialValues = {
  searchTerm: "",
};

const HomePage = () => {
  const searchItemSchema = Yup.object().shape({
    searchTerm: Yup.string().required("Required!"),
  });
  const accessToken = useSelector(getAccessToken);
  const apiData = useSelector(getData);
  const dataSliceStatus = useSelector(getDataSliceStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogggedIn = useSelector(getIsLoggedIn);
  useEffect(() => {
    if (!isLogggedIn) {
      navigate("/");
    }
  }, [isLogggedIn, navigate]);
  useEffect(() => {
    return () => {
      dispatch(dataSliceActions.resetState());
    };
  }, [dispatch]);
  let cardContent;
  if (dataSliceStatus === "succeeded") {
    if (Object.keys(apiData).length > 0) {
      const metadata = apiData.metadata;
      const urls = apiData.urls;
      const mappedArrayofData = metadata.map((obj, index) => ({
        source: obj.source,
        url: urls[index],
      }));
      mappedArrayofData[0].context = apiData.context;
      cardContent = (
        <Card className="bg-secondary p-7 ">
          <DisplayData data={mappedArrayofData} />
        </Card>
      );
    } else {
      cardContent = (
        <Card className="bg-secondary p-7 ">
          <p className="text-primary pb-2">No results</p>;
        </Card>
      );
    }
  } else if (dataSliceStatus === "rejected") {
    cardContent = (
      <Card className="bg-secondary p-7 ">
        <p className="text-primary pb-2 font-bold">Error Fetching data</p>
        <p className="text-primary pl-4">This may occur due to following reasons</p>
        <ol className="pl-8 list-decimal text-primary">
          <li>Your interent connection is disabled</li>
          <li>You may not be authorized, log back in</li>
          <li>Internal Server Error</li>
        </ol>
      </Card>
    );
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={searchItemSchema}
        onSubmit={(values) =>
          dispatch(fetchSimilarDocs({ q: values.searchTerm, verbose: true, accessToken: accessToken }))
        }
      >
        <Form className="felx items-center justify-center sm:px-9 md:px-60 px- pt-10 mb-5">
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
      {cardContent}
    </>
  );
};

export default HomePage;
