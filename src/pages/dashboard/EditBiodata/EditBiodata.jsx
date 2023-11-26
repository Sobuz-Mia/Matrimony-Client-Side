import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
// import { DatePicker } from "@mui/material/DatePicker";
// import { DatePicker } from "@mui/material";

const EditBiodata = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <Container>
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
                      <TextField {...field} label="Name" fullWidth required />
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
                      <input {...field} type="date" style={{ width: "50%" }} />
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
                      <TextField {...field} label="Height" fullWidth required />
                    )}
                  />

                  {/* weight */}
                  <Controller
                    name="weight"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField {...field} label="Weight" fullWidth required />
                    )}
                  />
                  {/* age */}
                  <Controller
                    name="age"
                    control={control}
                    defaultValue=""
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
                      <TextField {...field} label="Race" fullWidth required />
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
  );
};

export default EditBiodata;
