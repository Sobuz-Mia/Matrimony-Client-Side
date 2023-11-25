import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import useAuth from "./../../hooks/useAuth";
import Swal from "sweetalert2";

export default function Register() {
  const { createUser, handleUpdateProfile } = useAuth();
  const navigate = useNavigate();
  // handle input filed value

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hello")
    const data = new FormData(event.currentTarget);
    const userInfo = {
      name:data.get("name"),
      email:data.get("email"),
      password:data.get("password"),
      photoUrl:data.get("photo")
    }
    console.log(userInfo)
    // const name = data.get("name");
    // const email = data.get("email");
    // const password = data.get("password");
    // const photoUrl = data.get("photo");
    try {
      // create user
      const result = await createUser(userInfo.email, userInfo.password);
      // update user
      if (result.user) {
        handleUpdateProfile(userInfo.name,userInfo.photoUrl).then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your account created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      } else {
        console.log("update not complete");
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(name,email,password,photoUrl);
  };
  const defaultTheme = createTheme();
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    label="Your Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Your Email"
                    name="email"
                    autoComplete="Email"
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
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="photo"
                    label="Photo Url"
                    type="photo-url"
                    autoComplete="new-photo"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Agree our Term & conditions"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <p>
                  Already have an account? <Link to={"/login"}>Login</Link>
                </p>
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <p>Or Login With</p>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 5, width: "100%" }}
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
