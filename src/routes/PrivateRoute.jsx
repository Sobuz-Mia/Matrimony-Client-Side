import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Box, Skeleton } from "@mui/material";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (user) {
    return children;
  }
  if (loading) {
    return (
      <Box sx={{ width: 400 ,mx:'auto',mt:'30px'}}>
      <Skeleton  />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
    );
  }
  return <Navigate to={"/login"} state={location.pathname} replace></Navigate>;
};

export default PrivateRoute;
