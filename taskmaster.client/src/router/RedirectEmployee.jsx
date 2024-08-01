import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const RedirectEmployee = ({ children, path }) => {

    const user = Cookies.get("user");

    return user ? <Navigate to={path} replace /> : children;
}

export default RedirectEmployee