import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar/Navbar";
import { Grid } from "@mui/material";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Grid sx={{pt:10}}>
        <Outlet />
      </Grid>
    </div>
  );
};

export default Main;
