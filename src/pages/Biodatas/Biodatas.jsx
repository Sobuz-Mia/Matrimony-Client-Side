import { Button, Container, Grid} from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BiodataCard from "./BiodataCard";


const Biodatas = () => {
  const [biodata, setBiodata] = useState([]);
  const axiosSecure = useAxiosSecure();
  const handleSearch = (e) => {
    console.log(e.target.value);
  };
  useEffect(() => {
    axiosSecure.get("/biodatas").then((res) => setBiodata(res.data));
  }, [axiosSecure]);
  return (
    <Container maxWidth="lg" sx={{ mx: "auto" }}>
      <form>
        <label style={{ color: "#E33183" }}>Search here</label>
        <Grid sx={{ display: "flex", gap: "10px" }}>
          <input
            onChange={handleSearch}
            type="search"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid",
              width: "500px",
            }}
            placeholder="Search age,male or female..."
            required
          />
          <Button
            variant="outlined"
            color="secondary"
            sx={{ textTransform: "initial" }}
          >
            All Created Biodata
          </Button>
        </Grid>
      </form>
      <Grid container spacing={2}>
      {biodata.map((biodata) => (
        <Grid key={biodata.id} item xs={12} md={4}>
          <BiodataCard biodata={biodata} />
        </Grid>
      ))}
    </Grid>
    </Container>
  );
};

export default Biodatas;
