import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Box, Button, Skeleton, Typography } from "@mui/material";

const CheckoutForm = ({ paymentInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axioSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const totalPrice = 5000;

  useEffect(() => {
    if (totalPrice > 0) {
      setLoading(true);
      axioSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [axioSecure]);
  if (loading) {
    <Box sx={{ width: 300 }}>
      <Skeleton  />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const card = elements.getElement(CardElement);
      if (!card) {
        throw new Error("Card element not found");
      }

      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        console.error("Error creating payment method:", error);
        setError(error.message);
      } else {
        // console.log("error inside the payment method", paymentMethod);
        setError("");
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "anonymous",
              email: user?.email || "anonymous",
            },
          },
        });

      if (confirmError) {
        console.error("Error confirming card payment:", confirmError);
        setError("Failed to confirm card payment");
      } else {
        if (paymentIntent.status === "succeeded") {
          setTransactionId(paymentIntent.id);
          // ... (your existing code for saving payment details)
          const paymentDetails = {
            email: paymentInfo?.selfEmail,
            price: totalPrice,
            TNXid: paymentIntent.id,
            selfId: paymentInfo?.selfBiodataId,
            biodataId: paymentInfo?.biodataid,
            date: new Date(), //need convert data to utc for international client
            status: "pending",
          };
          await axioSecure.post("/payment", paymentDetails).then((res) => {
            // console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Payment Successfully Received",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        } else {
          console.error(
            "Unexpected paymentIntent status:",
            paymentIntent.status
          );
          setError("Unexpected payment status");
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              marginTop: '5px',
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button variant={'outlined'} color="secondary" sx={{mt:4}} type="submit" disabled={!stripe}>
        Pay
      </Button>
      <p style={{ fontSize: "20px", color: "red" }}>{error}</p>
      {transactionId ? (
        <>
          <p style={{ fontSize: "25px", color: "green" }}>Payment Success</p>
          <p style={{ fontSize: "20px", color: "green" }}>
            Your trasaction_Id: {transactionId}
          </p>
        </>
        ):
        <Typography variant="h6" sx={{textAlign:'center',fontSize:'20px'}} color={"secondary"}>Make payment fast for your request</Typography>
      }
    </form>
  );
};

export default CheckoutForm;
