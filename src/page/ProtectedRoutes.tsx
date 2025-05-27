
import { Roles } from "@/@types/types";
import { RootState, useAppSelector } from "@/store";
import { Navigate, Outlet } from "react-router-dom";

interface RoleProtectedRouteProps {
  allowedRoles: Roles[];
}
function ProtectedRoutes({ allowedRoles }: RoleProtectedRouteProps) {
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);

  console.log('User roles: ProtectedRoutes inuer', user);
  console.log('User roles: ProtectedRoutes', user?.roles);
console.log('Allowed roles:', allowedRoles)
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (user && !allowedRoles.some((role) => user?.roles?.includes(role))) {
    return <Navigate to="/" />;
  }
  return <Outlet/>
}
export default ProtectedRoutes