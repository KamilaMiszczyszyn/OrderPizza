import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface ComponentProps {
    element?: React.ReactNode,
}

const AdminRoute = ({ element }: ComponentProps) => {
    const location = useLocation();
     const { role } = useContext(AuthContext);

     
     console.log(role)

    if ( !role || role !== "admin") {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return element;
};

export default AdminRoute
