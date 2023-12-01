import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useRef } from "react";
import useAxiosPublic from './../../hooks/useAxiosPublic';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const { loggedInUser, googleLogIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    loggedInUser(email, password)
      .then((res) => {
        if (res.user) {
          formRef.current.reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Log in successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((error) => {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...Sorry",
            text: "Invalid email / password!",
          });
        }
      });
  };
  const handleGoogleLogin = () => {
    googleLogIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        userName: result.user?.displayName,
      };

      axiosPublic.post("/users", userInfo).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "user log in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      });
    });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Grid
          sx={{
            border: "1px solid",
            margin: "10px 0px",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
              ref={formRef}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs>
                  <p>Forgot password?</p>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container justifyContent="center">
                <p>
                  Do not have an account? <Link to={"/register"}>Sign Up</Link>
                </p>
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <p>Or Login With</p>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 5, width: "100%" }}
                  onClick={handleGoogleLogin}
                >
                  <GoogleIcon />
                </Button>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
