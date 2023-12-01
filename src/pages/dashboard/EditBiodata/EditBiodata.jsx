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

const EditBiodata = () => {
  const { control, handleSubmit, reset } = useForm();
  const [existingBiodata, setExistingBiodata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //   get existing user biodata
  useEffect(() => {
    axiosSecure.get(`/singleBiodata?email=${user?.email}`).then((res) => {
      setExistingBiodata(res?.data);
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
      age: data.age,
      biodataType: data.biodataType,
      dateOfBirth: data.dateOfBirth,
      fatherName: data.fatherName,
      height: data.height,
      motherName: data.motherName,
      name: data.name,
      occupation: data.occupation,
      partnerHeight: data.partnerHeight,
      partnerWeight: data.partnerWeight,
      permanentDivision: data.permanentDivision,
      photoUrl: data.photoUrl,
      presentDivision: data.presentDivision,
      race: data.race,
      weight: data.weight,
      contactEmail:data.email,
      phoneNumber:data?.phoneNumber
    };
   console.log(biodataInfo)
    // create biodata
    axiosSecure.post("/edit-create/biodata", biodataInfo).then((res) => {
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user?.displayName} Your biodata has been created`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    // update biodata
    axiosSecure
      .patch(`/update/biodata/${existingBiodata?._id}`, biodataInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user?.displayName} Your biodata Updated Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log(res.data);
      });
  };

  return (
    <>
      {existingBiodata ? (
        <Container>
          <Typography
            sx={{ textAlign: "center", my: 2, fontSize: "30px" }}
            color={"secondary"}
          >
            Edit Biodata
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    {/* Biodata Type */}
                    <Grid sx={{ display: "flex", gap: "10px" }}>
                      {existingBiodata?.biodataType && (
                        <Controller
                          name="biodataType"
                          control={control}
                          defaultValue={existingBiodata.biodataType}
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
                      )}

                      {/* Name */}
                      {existingBiodata?.name && (
                        <Controller
                          name="name"
                          control={control}
                          defaultValue={existingBiodata?.name}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Name"
                              fullWidth
                              required
                            />
                          )}
                        />
                      )}
                    </Grid>
                    <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      {/* photo */}
                      {existingBiodata?.photoUrl && (
                        <Controller
                          name="photoUrl"
                          control={control}
                          defaultValue={existingBiodata?.photoUrl}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="photo url"
                              required
                              style={{ width: "50%" }}
                            />
                          )}
                        />
                      )}

                      {/* date */}
                      {
                        existingBiodata?.dataOfBirth && 
                        <Controller
                        name="dateOfBirth"
                        control={control}
                        defaultValue={existingBiodata?.dateOfBirth}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="date"
                            style={{ width: "50%" }}
                          />
                        )}
                      />
                      }
                    </Grid>

                    <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      {/* height*/}
                      { existingBiodata?.height &&
                        <Controller
                        name="height"
                        control={control}
                        defaultValue={existingBiodata?.height}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Height"
                            fullWidth
                            required
                          />
                        )}
                      />}

                      {/* weight */}
                      {existingBiodata?.weight &&
                        <Controller
                        name="weight"
                        control={control}
                        defaultValue={existingBiodata?.weight}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Weight"
                            fullWidth
                            required
                          />
                        )}
                      />}
                      {/* age */}
                      {existingBiodata?.age &&
                        <Controller
                        name="age"
                        control={control}
                        defaultValue={existingBiodata?.age}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Age"
                            fullWidth
                            required
                          />
                        )}
                      />}
                    </Grid>
                    <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      {/* occupation*/}
                      {existingBiodata?.occupation &&
                        <Controller
                        name="occupation"
                        control={control}
                        defaultValue={existingBiodata?.occupation}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Occupation"
                            fullWidth
                            required
                          />
                        )}
                      />}

                      {/* race */}
                      {existingBiodata?.race &&
                        <Controller
                        name="race"
                        control={control}
                        defaultValue={existingBiodata?.race}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Race"
                            fullWidth
                            required
                          />
                        )}
                      />}
                    </Grid>
                    <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      {/* occupation*/}
                      {existingBiodata?.fatherName &&
                        <Controller
                        name="fatherName"
                        control={control}
                        defaultValue={existingBiodata?.fatherName}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Father Name"
                            fullWidth
                            required
                          />
                        )}
                      />}

                      {/* race */}
                      {existingBiodata?.motherName &&
                        <Controller
                        name="motherName"
                        control={control}
                        defaultValue={existingBiodata?.motherName}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Mother Name"
                            fullWidth
                            required
                          />
                        )}
                      />}
                    </Grid>
                    <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      {/* permanent division */}
                      {existingBiodata?.permanentDivision &&
                        <Controller
                        name="permanentDivision"
                        control={control}
                        defaultValue={existingBiodata?.permanentDivision}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Permanent Division"
                            fullWidth
                            required
                          />
                        )}
                      />}

                      {/* present division */}
                      {existingBiodata?.presentDivision &&
                        <Controller
                        name="presentDivision"
                        control={control}
                        defaultValue={existingBiodata?.presentDivision}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Present Division"
                            fullWidth
                            required
                          />
                        )}
                      />}
                    </Grid>
                    <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      {/*partner height */}
                      {existingBiodata?.partnerHeight &&
                        <Controller
                        name="partnerHeight"
                        control={control}
                        defaultValue={existingBiodata?.partnerHeight}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Expected Partner Height"
                            fullWidth
                            required
                          />
                        )}
                      />}

                      {/* partner weight */}
                      {existingBiodata?.partnerWeight &&
                        <Controller
                        name="partnerWeight"
                        control={control}
                        defaultValue={existingBiodata?.partnerWeight}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Expected Partner Weight"
                            fullWidth
                            required
                          />
                        )}
                      />}
                    </Grid>
                    <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      {/*partner height */}
                      {user?.email && (
                        <Controller
                          name="email"
                          control={control}
                          defaultValue={user?.email}
                          disabled
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Contact Email"
                              fullWidth
                              required
                            />
                          )}
                        />
                      )}

                      {/* partner weight */}
                      <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue={existingBiodata?.phoneNumber}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Phone Number"
                            fullWidth
                            required
                          />
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
                      Save And Publish Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </form>
        </Container>
      ) : (
        <Container>
          <Typography
            sx={{ textAlign: "center", my: 2, fontSize: "30px" }}
            color={"secondary"}
          >
            Create a Biodata
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
                        defaultValue=""
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
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Name"
                            fullWidth
                            required
                          />
                        )}
                      />
                    </Grid>
                    <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      {/* photo */}
                      <Controller
                        name="photoUrl"
                        control={control}
                        defaultValue=""
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
                        defaultValue={null}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="date"
                            style={{ width: "50%" }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      {/* height*/}
                      <Controller
                        name="height"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Height"
                            fullWidth
                            required
                          />
                        )}
                      />

                      {/* weight */}
                      <Controller
                        name="weight"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Weight"
                            fullWidth
                            required
                          />
                        )}
                      />
                      {/* age */}
                      <Controller
                        name="age"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Age"
                            fullWidth
                            required
                          />
                        )}
                      />
                    </Grid>
                    <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      {/* occupation*/}
                      <Controller
                        name="occupation"
                        control={control}
                        defaultValue=""
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
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Race"
                            fullWidth
                            required
                          />
                        )}
                      />
                    </Grid>
                    <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      {/* occupation*/}
                      <Controller
                        name="fatherName"
                        control={control}
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
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
                      {user?.email && (
                        <Controller
                          name="email"
                          control={control}
                          defaultValue={user?.email}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Contact Email"
                              fullWidth
                              required
                            />
                          )}
                        />
                      )}

                      {/* partner weight */}
                      <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue={''}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Phone Number"
                            fullWidth
                            required
                          />
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
                      Save Edit Biodata
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </form>
        </Container>
      )}
    </>
  );
};

export default EditBiodata;
