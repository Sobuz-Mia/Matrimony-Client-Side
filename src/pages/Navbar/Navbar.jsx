import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, Grid } from "@mui/material";
import logo from "../../assets/logo.jpg";
import { Link, NavLink } from "react-router-dom";
const drawerWidth = 240;
const navItems = ["Home", "Biodatas", "About Us", "Contact Us"];
const navLinks = (
  <>
    <li className="navLink">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "navLink")}
        // style={{textDecoration:'none'}}
      >
        Home
      </NavLink>
    </li>
    <li className="navLink">
      <NavLink
        to="/biodata"
        className={({ isActive }) => (isActive ? "active" : "navLink")}
        // style={{textDecoration:'none'}}
      >
        Biodatas
      </NavLink>
    </li>
    <li className="navLink">
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active" : "navLink")}
        // style={{textDecoration:'none'}}
      >
        About Us
      </NavLink>
    </li>
    <li className="navLink">
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? "active" : "navLink")}
        // style={{textDecoration:'none'}}
      >
        Contact Us
      </NavLink>
    </li>
  </>
);
function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar color="primary" component="nav">
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block", color: "black" },
              }}
            >
              <Grid sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  src={logo}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "primary",
                  }}
                  alt=""
                />
                <p>
                  Matri <span style={{ color: "#E33183" }}>Marry</span>
                </p>
              </Grid>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  listStyle: "none",
                }}
              >
                {navLinks}
                <Link to={"/login"}>
                  <Button variant="outlined" color="secondary">
                    Login
                  </Button>
                </Link>
              </ul>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
