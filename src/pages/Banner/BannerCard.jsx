import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Paper } from "@mui/material";

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
              height: "200px",
              borderRadius: "50%",
              width: "200px",
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
          <Typography variant="h6" color="text.secondary">
            Location:{division}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Occupation:{occupation}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
