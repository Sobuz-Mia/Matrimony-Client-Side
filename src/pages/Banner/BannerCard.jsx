import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function BannerCard({ item }) {
  const { age, biodataId, biodataType, division, occupation, profileImage } =
    item;
  console.log(item);
  return (
    <Card sx={{ height: "full" }}>
      <CardActionArea>
        <Grid>
          <img
            style={{
              height: "150px",
              borderRadius: "50%",
              width: "150px",
              pt: 5,
            }}
            src={profileImage}
            alt=""
          />
        </Grid>
        <CardContent>
          <Paper
            elevation={3}
            sx={{
              textAlign: "center",
              width: "fit-content",
              mx: "auto",
              padding: "5px",
            }}
          >
            Id: {biodataId}
          </Paper>
          <Typography variant="h5" color="secondary">
            Gender:{biodataType}
          </Typography>
          <Typography variant="h6" color="#272727">
            Age:{age}
          </Typography>
          <Grid sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <Typography variant="h6" color="text.secondary">
              <span style={{ color: "#272727" }}>Location:</span> {division}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              <span style={{ color: "#272727" }}>Occupation:</span> {occupation}
            </Typography>
          </Grid>
          <Link to={'/details'}>
            <Button variant="outlined" color="secondary" sx={{ my: "10px" }}>
              View Profile
            </Button>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
