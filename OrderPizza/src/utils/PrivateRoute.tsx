import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"

interface ComponentProps {
    element?: React.ReactNode,
}

const PrivateRoute = ({element}: ComponentProps) => {
    const location = useLocation();
    const {uid} = useContext(AuthContext);
    console.log(uid) // zwraca nr uid kcOGnWfFvfNCDFPTveERhx1icBG3
    console.log("Children:", element); //zwraca undefined

  if (!uid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  console.log(uid)

  return element;
}

export default PrivateRoute