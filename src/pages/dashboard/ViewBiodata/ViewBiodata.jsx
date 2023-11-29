import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const ViewBiodata = () => {
  const { control, handleSubmit, reset } = useForm();
  const [existingBiodata, setExistingBiodata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //   get existing user biodata
  useEffect(() => {
    axiosSecure.get(`/singleBiodata?email=${user?.email}`).then((res) => {
      setExistingBiodata(res.data);
      setIsLoading(false);
    });
  }, [axiosSecure, user?.email]);

  if (isLoading) {
    return (
      <div className="w-24 mx-auto flex items-center h-screen">
        <span className="loading loading-spinner text-secondary w-full"></span>
      </div>
    );
  }

  // Handle form submission logic
  const onSubmit = (data) => {
    const biodataInfo = {
      biodataId: existingBiodata?.biodataId,
      name: data.name,
      email: user?.email,
      contactEmail: data.contactEmail|| '',
      phone: data.phoneNumber || '',
      premiumRequest: "Pending to premium",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able request this biodata to premium!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Request to premium!",
    }).then((result) => {
      if (result.isConfirmed) {
        // create biodata
        axiosSecure.post("/make-premium/request", biodataInfo).then((res) => {
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${user?.displayName} Your Request has been accepted`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
 
  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", my: 2, fontSize: "30px" }}
        color={"secondary"}
      >
        View Biodata & make premium
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                {/* Biodata Type */}
                <Grid sx={{ display: "flex", gap: "10px" }}>
                  <Controller
                    name="biodataType"
                    control={control}
                    defaultValue={existingBiodata.biodataType}
                    disabled
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Biodata Type"
                        select
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </TextField>
                    )}
                  />

                  {/* Name */}
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={existingBiodata?.name}
                    disabled
                    render={({ field }) => (
                      <TextField {...field} label="Name" fullWidth required />
                    )}
                  />
                </Grid>
                <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                  {/* photo */}
                  <Controller
                    name="photoUrl"
                    control={control}
                    defaultValue={existingBiodata?.photoUrl}
                    disabled
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="photo url"
                        required
                        style={{ width: "50%" }}
                      />
                    )}
                  />

                  {/* date */}
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    defaultValue={existingBiodata?.dateOfBirth}
                    disabled
                    render={({ field }) => (
                      <input {...field} type="date" style={{ width: "50%" }} />
                    )}
                  />
                </Grid>

                <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                  {/* height*/}
                  <Controller
                    name="height"
                    control={control}
                    defaultValue={existingBiodata?.height}
                    disabled
                    render={({ field }) => (
                      <TextField {...field} label="Height" fullWidth required />
                    )}
                  />

                  {/* weight */}
                  <Controller
                    name="weight"
                    control={control}
                    defaultValue={existingBiodata?.weight}
                    disabled
                    render={({ field }) => (
                      <TextField {...field} label="Weight" fullWidth required />
                    )}
                  />
                  {/* age */}
                  <Controller
                    name="age"
                    control={control}
                    defaultValue={existingBiodata?.age}
                    disabled
                    render={({ field }) => (
                      <TextField {...field} label="Age" fullWidth required />
                    )}
                  />
                </Grid>
                <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                  {/* occupation*/}
                  <Controller
                    name="occupation"
                    control={control}
                    defaultValue={existingBiodata?.occupation}
                    disabled
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Occupation"
                        fullWidth
                        required
                      />
                    )}
                  />

                  {/* race */}
                  <Controller
                    name="race"
                    control={control}
                    defaultValue={existingBiodata?.race}
                    disabled
                    render={({ field }) => (
                      <TextField {...field} label="Race" fullWidth required />
                    )}
                  />
                </Grid>
                <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                  {/* occupation*/}
                  <Controller
                    name="fatherName"
                    control={control}
                    defaultValue={existingBiodata?.fatherName}
                    disabled
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Father Name"
                        fullWidth
                        required
                      />
                    )}
                  />

                  {/* race */}
                  <Controller
                    name="motherName"
                    control={control}
                    defaultValue={existingBiodata?.motherName}
                    disabled
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Mother Name"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                  {/* permanent division */}
                  <Controller
                    name="permanentDivision"
                    control={control}
                    defaultValue={existingBiodata?.permanentDivision}
                    disabled
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Permanent Division"
                        fullWidth
                        required
                      />
                    )}
                  />

                  {/* present division */}
                  <Controller
                    name="presentDivision"
                    control={control}
                    defaultValue={existingBiodata?.presentDivision}
                    disabled
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Present Division"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                  {/*partner height */}
                  <Controller
                    name="partnerHeight"
                    control={control}
                    defaultValue={existingBiodata?.partnerHeight}
                    disabled
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Expected Partner Height"
                        fullWidth
                        required
                      />
                    )}
                  />

                  {/* partner weight */}
                  <Controller
                    name="partnerWeight"
                    control={control}
                    defaultValue={existingBiodata?.partnerWeight}
                    disabled
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Expected Partner Weight"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                  {/*partner height */}
                  <Controller
                    name="contactEmail"
                    control={control}
                    defaultValue={existingBiodata?.contactEmail}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Contact email"
                        fullWidth
                        required
                      />
                    )}
                  />

                  {/* partner weight */}
                  <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue={existingBiodata?.phoneNumber}
                    render={({ field }) => (
                      <TextField {...field} label="Phone" fullWidth required />
                    )}
                  />
                </Grid>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  Make biodata to premium
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ViewBiodata;
