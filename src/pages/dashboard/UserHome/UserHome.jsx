import { Avatar, Box, Container,  Paper, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import { Helmet } from "react-helmet-async";


const UserHome = () => {
    const {user} = useAuth();
    const [isAdmin] = useAdmin();
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Helmet>
            <title>Dashboard || User Home</title>
          </Helmet>
        <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            alt={user?.displayName || 'User'}
            src={user?.photoURL}
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Hi, <span style={{color:'#E33183',fontWeight:'bold'}}> {user?.displayName || 'User'}</span> Welcome back 
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Your Email: <span style={{fontSize:'16px'}}>{user?.email}</span>
            </Typography>
            <Typography variant="h6" gutterBottom>
             Status: <span style={{fontSize:'16px'}}>{isAdmin?"Admin" : "Normal User"}</span>
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
};

export default UserHome;