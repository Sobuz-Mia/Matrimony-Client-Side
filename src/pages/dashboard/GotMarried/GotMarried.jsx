import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const GotMarried = () => {
    const [textAreaValue, setTextAreaValue] = useState('');
  const { control, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  // Handle form submission logic
  const onSubmit = (data) => {
      const successInfo = {
          image: data.photoUrl,
          marriageDate: data.marriageDate,
          rating:5,
          story:textAreaValue,
          selfId:data.selfBiodata,
          partnerId:data.partnerBiodata
        };
        axiosSecure.post('/marriage-story',successInfo)
        .then(res=>{
            if(res.data.insertedId){
                reset()
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your success story has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
  };

  return (
    <Container>
      <Helmet>
        <title>Dashboard || Got Married</title>
      </Helmet>
      <Typography
        sx={{ textAlign: "center", my: 2, fontSize: "30px" }}
        color={"secondary"}
      >
        Publish Your Marriage Story to World Wide
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                  {/* biodata number */}
                  <Controller
                    name="selfBiodata"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Your Biodata Number"
                        required
                        style={{ width: "50%" }}
                      />
                    )}
                  />
                  {/* parner bidata number */}
                  <Controller
                    name="partnerBiodata"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Your Partner Biodata Number"
                        required
                        style={{ width: "50%" }}
                      />
                    )}
                  />
                </Grid>
                <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                  {/* photo url*/}
                  <Controller
                    name="photoUrl"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Couple Picture Url"
                        fullWidth
                        required
                      />
                    )}
                  />

                  {/* marriage date */}
                  <Controller
                    name="marriageDate"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <input
                        {...field}
                        label="Couple Picture Url"
                        type="date"
                        style={{ width: "50%", padding: "4" }}
                      />
                    )}
                  />
                </Grid>
                <TextField
                  sx={{ mb: 4 }}
                  multiline
                  defaultValue={textAreaValue}
                  onChange={(e)=>setTextAreaValue(e.target.value)}
                  rows={3}
                  label="Write your success story . How was the journey to get your partner??"
                  variant="outlined"
                  fullWidth
                  required
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default GotMarried;
