import { Container, Grid, Typography, List, ListItem } from "@mui/material";
import { Outlet, NavLink as RouterNavLink } from "react-router-dom";

const Dashboard = () => {
  const sidebarStyle = {
    width: "16rem",
    minHeight: "100vh",
    backgroundColor: " #F3F3F4",
    padding: "1.5rem 2.25rem",
    textAlign: "center",
    color: "#272727",
  };

  return (
    <Container>
      <Grid container style={{display:'flex',gap:'10px'}}>
        {/* Sidebar */}
        <Grid item style={sidebarStyle}>
          <Typography
            variant="h5"
            sx={{
              textTransform: "capitalize",
              fontSize: "20px",
              marginBottom: "1rem",
            }}
          >
            Matri <span style={{ color: "#E33183" }}>Marry</span>
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ letterSpacing: "5px", marginBottom: "1rem" ,width:'full'}}
          >
            Find your soulmate
          </Typography>
          <List sx={{ padding: 0 }}>
            <ListItem  sx={{ marginBottom: "1rem" }}>
              <RouterNavLink
                to="/"
                className={({ isActive }) =>
                isActive ?"active" : "navLink" 
              }
              >
                Home
              </RouterNavLink>
            </ListItem>
            <ListItem  sx={{ marginBottom: "1rem" }}>
              <RouterNavLink
                to="/dashboard/editBiodata"
                className={({ isActive }) =>
                  isActive ?"active" : "navLink" 
                }
              >
                Edit Biodata
              </RouterNavLink>
            </ListItem>
            <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
              <RouterNavLink
                to="/dashboard/viewBiodata"
             
                className={({ isActive }) =>
                isActive ?"active" : "navLink" 
              }
              >
                View Biodata
              </RouterNavLink>
            </ListItem>
            <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
              <RouterNavLink
                to="/dashboard/manageBooking"
                className={({ isActive }) =>
                  isActive ?"active" : "navLink" 
                }
              >
                My Contact Request
              </RouterNavLink>
            </ListItem>
            <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
              <RouterNavLink
                to="/dashboard/allUsers"
                className={({ isActive }) =>
                isActive ?"active" : "navLink" 
              }
              >
                Favourites Biodata
              </RouterNavLink>
            </ListItem>
            <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
              <RouterNavLink
                to="/dashboard/allUsers"
                className={({ isActive }) =>
                  isActive ?"active" : "navLink" 
                }
              >
                Logout
              </RouterNavLink>
            </ListItem>
          </List>
        </Grid>

        {/* Content */}
        <Grid item style={{flexGrow:1}}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
