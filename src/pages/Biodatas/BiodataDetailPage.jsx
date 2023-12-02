import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

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
import useUserBiodata from "../../hooks/useUserBiodata";
import { Helmet } from "react-helmet-async";

const BiodataDetailPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [singlebiodata, setSingleBiodata] = useState([]);
  const [similarData, setSimilarData] = useState([]);
  const [premiumData, setPremiumData] = useState({});
  const [biodata, ] = useUserBiodata();
  useEffect(() => {
    // fetch single data
    axiosSecure.get(`/biodata/${id}`).then((res) => {
      setSingleBiodata(res.data);
    });

    // // Fetch similar biodata based on gender

   
    axiosSecure
    .get(`/similar-data?gender=${singlebiodata?.biodataType}`)
    .then((res) => setSimilarData(res.data));

    // premium user data load
    singlebiodata?.biodataId &&
      axiosSecure
        .get(`/check-user-premium?email=${user?.email}&id=${singlebiodata.biodataId}`)
        .then((res) => setPremiumData(res.data));
  
    
  }, [axiosSecure, id, singlebiodata.biodataType, user?.email, singlebiodata?.biodataId]);

  //  handle add to favourites data
  
  
  const handleAddToFavourites = () => {
    const biodataInfo = {
      name:singlebiodata?.name,
      biodataId:singlebiodata?.biodataId,
      permanentAddress: singlebiodata?.permanentDivision,
      occupation:singlebiodata?.occupation,
      userEmail:user?.email
    }
    axiosSecure.post("/addToFavourite-collection", biodataInfo).then((res) => {
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
      <Helmet>
        <title>Details || Biodata</title>
      </Helmet>
      {/* Left Side: Biodata Details Information */}
      <Grid item xs={8} md={6}>
        <Card sx={{ maxWidth: 700, margin: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={singlebiodata.photoUrl}
            alt="Profile Image"
            sx={{ objectFit: "cover" }}
          />
          <Grid style={{ display: "flex", gap: "20px", flexGrow: 1 }}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Biodata ID: {singlebiodata.biodataId}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Name: {singlebiodata.name}
              </Typography>
              <Grid sx={{ display: "flex", gap: "20px" }}>
                <Typography variant="body2" color="text.secondary">
                  Gender: {singlebiodata.gender === "male" ? "Male" : "Female"}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Permanent Division: {singlebiodata.permanentDivision}
                </Typography>
              </Grid>
              <Typography variant="body2" color="text.secondary">
                Age: {singlebiodata.age}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date of Birth: {singlebiodata.dateOfBirth}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Occupation: {singlebiodata.occupation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Race: {singlebiodata.race}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Weight: {singlebiodata.weight}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Father Name: {singlebiodata.fatherName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mother Name: {singlebiodata.motherName}
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
                    Phone Number: {premiumData?.phoneNumber}
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

            {biodata?
              <Link to={`/checkout/${singlebiodata?._id}`}>
              {premiumData?.message == "you are not premium member" ? (
                <Button variant="contained" color="secondary" sx={{ mb: 3 }}>
                  Request for contact information
                </Button>
              ) : (
                ""
              )}
            </Link>
            :
            <Navigate  to="/dashboard/editBiodata"></Navigate>
            }
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
