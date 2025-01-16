import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"

interface ComponentProps {
    element?: React.ReactNode,
}

const PrivateRoute = ({element}: ComponentProps) => {
    const location = useLocation();
    const {uid} = useContext(AuthContext);

  if (!uid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return element;
}

export default PrivateRoute