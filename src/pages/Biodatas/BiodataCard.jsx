import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const BiodataCard = ({ biodata }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={biodata.photoUrl}
        alt="Profile Image"
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Biodata ID: {biodata.biodataId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Biodata Type: {biodata.gender === "male" ? "Male" : "Female"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Permanent Division: {biodata.division}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {biodata.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Occupation: {biodata.occupation}
        </Typography>
      </CardContent>
      <Grid container justifyContent="center" alignItems="center">
        <Link to={`detailsPage/${biodata._id}`}>
          <Button variant="contained" color="secondary" sx={{ mb: 3 }}>
            View Profile
          </Button>
        </Link>
      </Grid>
    </Card>
  );
};

export default BiodataCard;
