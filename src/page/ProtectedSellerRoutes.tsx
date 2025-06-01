import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store";
import { Roles } from "@/@types/types";

const ProtectedSellerRoutes = () => {
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
console.log(Roles.SELLER)
  if (!isAuthenticated || !user?.roles.includes(Roles.SELLER)) {
    return <Navigate to="/seller" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/seller" replace />;
  }

  return <Outlet />;
};

export default ProtectedSellerRoutes;
