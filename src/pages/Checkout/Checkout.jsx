import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";

import useUserBiodata from "../../hooks/useUserBiodata";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../dashboard/Payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_API_Key);
const Checkout = () => {
  const { control } = useForm();
  const axiosSecure = useAxiosSecure();
  const [singleBiodata, setSingleBiodata] = useState({});
  const { id } = useParams();
  const [biodata, isLoading] = useUserBiodata();
  //   console.log(biodata);

  if (isLoading) {
    <Box sx={{ width: 300 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>;
  }
  //   load single data
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/biodata/${id}`);
      setSingleBiodata(res?.data);
    };
    fetchData();
  }, [axiosSecure, id, setSingleBiodata]);

  // payment information
  const paymentInfo = {
    biodataid: singleBiodata?.biodataId || '',
    selfBiodataId: biodata?.biodataId || '',
    selfEmail: biodata?.contactEmail || '',
    name:singleBiodata?.name || '',
    contactEmail:biodata?.contactEmail || '',
    mobileNumber:biodata?.phoneNumber || '',
  };

  return (
    <Container>
      <Helmet>
        <title>Checkout || page</title>
      </Helmet>
      <Typography
        sx={{ textAlign: "center", my: 2, fontSize: "30px" }}
        color={"secondary"}
      >
        Checkout your info
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ border: "1px solid", width: "70%", mx: "auto" }}>
            <CardContent>
              {/* Biodata Type */}
              <Grid sx={{ display: "flex", gap: "10px", mb: 2 }}>
                {/* height*/}
                {singleBiodata?.biodataId && (
                  <Controller
                    name="biodataId"
                    control={control}
                    defaultValue={singleBiodata?.biodataId}
                    disabled
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
                    disabled
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
                    disabled
                    render={({ field }) => (
                      <TextField {...field} label="Email" fullWidth required />
                    )}
                  />
                )}
              </Grid>
              <Grid>
                <Elements stripe={stripePromise}>
                  <CheckoutForm paymentInfo={paymentInfo} />
                </Elements>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
