import {
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Rating,
} from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const successStorySectionStyle = {
  padding: "64px 0",
  backgroundColor: "#fff",
};

const successStoryCardStyle = {
  padding: "20px",
  textAlign: "center",
  minHeight: "200px",
};

const SuccessStory = () => {
  const axiosPublic = useAxiosPublic();
  const { data: successStory = [] } = useQuery({
    queryKey: ["successStory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/success-story");
      return res?.data;
    },
  });
  return (
    <div style={successStorySectionStyle}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          style={{
            color: "#E33183",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          Stories from the Heart
        </Typography>
        <Grid container spacing={4}>
          {/* Example Success Story Card */}
          {successStory.map((story) => (
            <Grid item xs={12} sm={6} md={4} key={story._id}>
              <Paper style={successStoryCardStyle}>
                <Avatar
                  alt="Couple Image"
                  src={story?.image} // Replace with the actual image URL
                  sx={{
                    width: 100,
                    height: 100,
                    marginBottom: "10px",
                    mx: "auto",
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  Marriage Date: {story?.marriageDate}
                </Typography>
                <Rating value={5} readOnly />
                <Typography variant="body2" style={{ marginTop: "10px" }}>
                  {story?.story}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default SuccessStory;
