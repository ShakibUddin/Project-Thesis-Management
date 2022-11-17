import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let user = useSelector((state) => state.auth?.user);
  return user?.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
