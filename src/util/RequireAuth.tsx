import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AllowedRole } from "../App";

interface RequireAuthProps {
  allowedRoles: AllowedRole[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user?.roles?.find((role: AllowedRole) =>
    allowedRoles.includes(role)
  ) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
