import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Paper } from "@mui/material";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const BiodataDetailPage = () => {
    const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [biodata, setBiodata] = useState([]);
//   const [similarBiodata, setSimilarBiodata] = useState([]);
    console.log(biodata)
  useEffect(() => {
    axiosSecure.get(`/biodata/${id}`).then(res=>{
        setBiodata(res.data)
    })
    // Fetch biodata details by ID
    // axios
    //   .get(`/biodata/${id}`)
    //   .then((response) => setBiodata(response.data))
    //   .catch((error) => console.error(error));

    // // Fetch similar biodata based on gender
    // axios
    //   .get(`/api/similar-biodata/${biodata.gender}`)
    //   .then((response) => setSimilarBiodata(response.data))
    //   .catch((error) => console.error(error));
  }, [id, biodata.gender]);

  return (
    <Grid container spacing={3}>
      {/* Left Side: Biodata Details Information */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4">{biodata.name}</Typography>
          {/* Display other biodata details here */}
          <Typography variant="body1">Gender: {biodata.gender}</Typography>
          <Typography variant="body1">Division: {biodata.division}</Typography>
          {/* Add other details here */}
        </Paper>
      </Grid>

      {/* Right Side: Similar Biodata */}
      
    </Grid>
  );
};

export default BiodataDetailPage;
