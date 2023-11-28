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

import useAuth from "../../hooks/useAuth";
import useUserBiodata from "../../hooks/useUserBiodata";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../dashboard/Payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_API_Key);
const Checkout = () => {
  const { control, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const [singleBiodata, setSingleBiodata] = useState({});
  const { id } = useParams();
  const { user } = useAuth();
  const [biodata, isLoading] = useUserBiodata();
  console.log(biodata);

  if (isLoading) {
    <div className="w-24 mx-auto flex items-center h-screen">
      <span className="loading loading-spinner text-secondary w-full"></span>
    </div>;
  }
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/biodata/${id}`);
      setSingleBiodata(res?.data);
    };
    fetchData();
  }, [axiosSecure, id, setSingleBiodata]);

  console.log("single biodata", singleBiodata?.biodataId);
  // Handle form submission logic
  const onSubmit = (data) => {
    console.log(data);
    const biodataInfo = {
      age: data.age,
      biodataType: data.biodataType,
      dateOfBirth: data.dateOfBirth,
      fatherName: data.fatherName,
      height: data.height,
      motherName: data.motherName,
      name: data.name,
      email: user?.email,
      occupation: data.occupation,
      partnerHeight: data.partnerHeight,
      partnerWeight: data.partnerWeight,
      permanentDivision: data.permanentDivision,
      photoUrl: data.photoUrl,
      presentDivision: data.presentDivision,
      race: data.race,
      weight: data.weight,
    };
  };

  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", my: 2, fontSize: "30px" }}
        color={"secondary"}
      >
        Checkout your info
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ border: "1px solid", width: "70%", mx: "auto" }}>
              <CardContent>
                {/* Biodata Type */}
                <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                  {/* height*/}
                  {singleBiodata?.biodataId && (
                    <Controller
                      name="Id"
                      control={control}
                      defaultValue={singleBiodata?.biodataId}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Biodata Id"
                          fullWidth
                          required
                        />
                      )}
                    />
                  )}

                  {/* weight */}
                  {biodata?.biodataId && (
                    <Controller
                      name="selfBiodataId"
                      control={control}
                      defaultValue={biodata?.biodataId}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Self BiodataId"
                          fullWidth
                          required
                        />
                      )}
                    />
                  )}
                  {/* age */}
                  {biodata?.email && (
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={biodata?.email}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          fullWidth
                          required
                        />
                      )}
                    />
                  )}
                </Grid>
                <Grid>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
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

export default Checkout;
