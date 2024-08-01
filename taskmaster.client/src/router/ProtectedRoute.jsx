import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, path }) => {
    let user = Cookies.get("user")

    if (!user) {
        return <Navigate to={path} />
    };

    return children
}

export default ProtectedRoute