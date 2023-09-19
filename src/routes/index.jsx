import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Signin from "../pages/Signin";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import ChangePassword from "../pages/ChangePassword";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Signin />} />
      <Route path="home" element={<HomePage />} />
      <Route path="changepassword" element={<ChangePassword />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
const index = () => {
  return <RouterProvider router={router} />;
};

export default index;
