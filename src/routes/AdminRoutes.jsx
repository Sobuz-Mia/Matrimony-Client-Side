import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { Box, Skeleton } from "@mui/material";

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin,isAdminLoading] = useAdmin();
  
    if (loading || isAdminLoading) {
      return (
        <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
      );
    }
    if(user && isAdmin){
      return children
    }
    return <Navigate to={"/login"} state={location.pathname} replace></Navigate>;
  };
  
  export default AdminRoutes;