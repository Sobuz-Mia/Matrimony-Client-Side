import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import SimilarCards from "../dashboard/EditBiodata/SimilarCards";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const BiodataDetailPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [biodata, setBiodata] = useState([]);
  const [similarData, setSimilarData] = useState([]);
  const [premiumData, setPremiumData] = useState(null);
  useEffect(() => {
    // fetch single data
    axiosSecure.get(`/biodata/${id}`).then((res) => {
      setBiodata(res.data);
    });

    // // Fetch similar biodata based on gender

    axiosSecure
      .get(`/similar-data?gender=${biodata?.biodataType}`)
      .then((res) => setSimilarData(res.data));

    // premium user data load
    axiosSecure
      .get(`/check-user-premium?email=${user?.email}&id=${biodata?.biodataId}`)
      .then((res) => setPremiumData(res.data));
  }, [axiosSecure, id, biodata.biodataType, user?.email, biodata?.biodataId]);
  //  handle add to favourites data
  const handleAddToFavourites = () => {
    axiosSecure.post("/addToFavourite-collection", biodata).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Your Card has been to Favourite`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <Grid container spacing={3}>
      {/* Left Side: Biodata Details Information */}
      <Grid item xs={8} md={6}>
        <Card sx={{ maxWidth: 700, margin: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={biodata.photoUrl}
            alt="Profile Image"
            sx={{ objectFit: "cover" }}
          />
          <Grid style={{ display: "flex", gap: "20px", flexGrow: 1 }}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Biodata ID: {biodata.biodataId}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Name: {biodata.name}
              </Typography>
              <Grid sx={{ display: "flex", gap: "20px" }}>
                <Typography variant="body2" color="text.secondary">
                  Gender: {biodata.gender === "male" ? "Male" : "Female"}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Permanent Division: {biodata.permanentDivision}
                </Typography>
              </Grid>
              <Typography variant="body2" color="text.secondary">
                Age: {biodata.age}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date of Birth: {biodata.dateOfBirth}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Occupation: {biodata.occupation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Race: {biodata.race}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Weight: {biodata.weight}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Father Name: {biodata.fatherName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mother Name: {biodata.motherName}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color={"secondary"}
              >
                Contact Information
              </Typography>
              {premiumData?.message === "you are not premium member" ? (
                <Typography style={{ color: "red" }}>
                  {premiumData?.message} <br /> Please make sure premium from
                  dashboard
                </Typography>
              ) : (
                <Grid>
                  <Typography gutterBottom variant="h5" component="div">
                    Name: {premiumData?.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Contact Email: {premiumData?.contactEmail}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Phone Number: {premiumData?.phone}
                  </Typography>
                </Grid>
              )}
            </CardContent>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" gap={5}>
            <Button
              onClick={handleAddToFavourites}
              variant="contained"
              color="secondary"
              sx={{ mb: 3 }}
            >
              Add to favourites
            </Button>

            <Link to={`/checkout/${biodata?._id}`}>
              {premiumData?.message == "you are not premium member" ? (
                <Button variant="contained" color="secondary" sx={{ mb: 3 }}>
                  Request for contact information
                </Button>
              ) : (
                ""
              )}
            </Link>
          </Grid>
        </Card>
      </Grid>
      {/* Right Side: Similar Biodata */}
      {similarData.map((biodata) => (
        <Grid key={biodata.id} item xs={12} md={3}>
          <SimilarCards biodata={biodata} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BiodataDetailPage;
