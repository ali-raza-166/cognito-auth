import logo from "../assets/imgs/netsol.jpg";
import { useSelector, useDispatch } from "react-redux";
import { getIsLoggedIn } from "../store/slices/authSlice";
import { authActions } from "../store/slices/authSlice";
const MainNavigation = () => {
  const isLoggedin = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("logout");
    dispatch(authActions.logout());
  };
  return (
    <header className="header">
      <nav className="flex justify-between pt-10">
        <img src={logo} alt="Description of the image" className=" pl-4 w-24 h-auto" />
        {isLoggedin && (
          <div>
            <p className="btn w-28 h-auto text-center cursor-pointer text-sm font-light" onClick={handleLogout}>
              Logout
            </p>
          </div>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
