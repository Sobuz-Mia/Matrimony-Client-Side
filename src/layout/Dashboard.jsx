import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { Outlet, NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { ImProfile } from "react-icons/im";
import { FaStreetView, FaUser, FaUserAlt } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Dashboard = () => {
    const {loggedOut} = useAuth();
    const navigate = useNavigate();
  const sidebarStyle = {
    width: "18rem",
    minHeight: "100vh",
    backgroundColor: " #F3F3F4",
    padding: "1.5rem 2.25rem",
    textAlign: "center",
    color: "#272727",
  };
  const [isAdmin] = useAdmin();
  const handleLogout = () => {
    loggedOut().then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User log out successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      });
      navigate('/')
  };
  return (
    <Container>
      {isAdmin ? (
        <Grid container style={{ display: "flex", gap: "10px" }}>
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
              sx={{ letterSpacing: "5px", marginBottom: "1rem", width: "full" }}
            >
              Find your Partner
            </Typography>
            <List sx={{ padding: 0 }}>
              <ListItem sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  to="/dashboard/adminDashboard"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaUser />
                  Admin Dashboard
                </RouterNavLink>
              </ListItem>
              <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  to="/dashboard/manage-user"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaStreetView />
                  Manage User
                </RouterNavLink>
              </ListItem>
              <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  to="/dashboard/approved-premium"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <MdContacts />
                  Approved Premium
                </RouterNavLink>
              </ListItem>
              <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  to="/dashboard/approved-contact-request"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <MdFavoriteBorder />
                  Approved Contact Request
                </RouterNavLink>
              </ListItem>
              <Divider variant="middle" />
              <ListItem sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <HomeIcon />
                  Home
                </RouterNavLink>
              </ListItem>
              <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  onClick={handleLogout}
                >
                  <IoIosLogOut />
                  Logout
                </RouterNavLink>
              </ListItem>
            </List>
          </Grid>

          {/* Content */}
          <Grid item style={{ flexGrow: 1 }}>
            <Outlet />
          </Grid>
        </Grid>
      ) : (
        <Grid container style={{ display: "flex", gap: "10px" }}>
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
              sx={{ letterSpacing: "5px", marginBottom: "1rem", width: "full" }}
            >
              Find your Partner
            </Typography>
            <List sx={{ padding: 0 }}>
              <ListItem sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  to="/dashboard/user-home"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaUserAlt/>
                  User Home
                </RouterNavLink>
              </ListItem>
              <ListItem sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  to="/dashboard/editBiodata"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <ImProfile />
                  Edit Biodata
                </RouterNavLink>
              </ListItem>
              <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  to="/dashboard/viewBiodata"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaStreetView />
                  View Biodata
                </RouterNavLink>
              </ListItem>
              <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  to="/dashboard/contact-request"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <MdContacts />
                  Contact Request
                </RouterNavLink>
              </ListItem>
              <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  to="/dashboard/favourites"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <MdFavoriteBorder />
                  Favorite Biodata
                </RouterNavLink>
              </ListItem>
              <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  to="/dashboard/got-married"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                 <VolunteerActivismIcon/>
                  Got Married
                </RouterNavLink>
              </ListItem>
              <Divider variant="middle" />
              <ListItem sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <HomeIcon />
                  Home
                </RouterNavLink>
              </ListItem>
              <ListItem className="navLink" sx={{ marginBottom: "1rem" }}>
                <RouterNavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                  onClick={handleLogout}
                >
                  <IoIosLogOut />
                  Logout
                </RouterNavLink>
              </ListItem>
            </List>
          </Grid>

          {/* Content */}
          <Grid item style={{ flexGrow: 1 }}>
            <Outlet />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
