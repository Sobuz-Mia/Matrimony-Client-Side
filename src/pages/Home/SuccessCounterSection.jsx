import { Container, Typography, Grid, Paper } from "@mui/material";
import CountUp from "react-countup";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const counterSectionStyle = {
  background: "#f4f4f4",
  padding: "64px 0",
  marginTop: "20px",
  marginBottom: "20px",
};

const counterCardStyle = {
  padding: "20px",
  textAlign: "center",
};

const SuccessCounterSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: counterData = {} } = useQuery({
    queryKey: ["counter"],
    queryFn: async () => {
      const res = await axiosPublic.get("/count-data");
      return res?.data;
    },
  });
  return (
    <div style={counterSectionStyle}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Celebrating Success:
          <span style={{ color: "#E33183" }}> A Look at Our Achievements</span>
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Paper style={counterCardStyle}>
              <Typography variant="h6" gutterBottom>
                Total Biodatas
              </Typography>
              <Typography variant="h4">
                <CountUp
                  end={counterData?.totalBio}
                  duration={5}
                  className="text-2xl font-semibold"
                />
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper style={counterCardStyle}>
              <Typography variant="h6" gutterBottom>
                Girls Biodatas
              </Typography>
              <Typography variant="h4">
                <CountUp
                  end={counterData?.femaleData}
                  duration={5}
                  className="text-2xl font-semibold"
                />
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper style={counterCardStyle}>
              <Typography variant="h6" gutterBottom>
                Boys Biodatas
              </Typography>
              <Typography variant="h4">
                <CountUp
                  end={counterData?.maleData}
                  duration={5}
                  className="text-2xl font-semibold"
                />
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3} offset={2}>
            <Paper style={counterCardStyle}>
              <Typography variant="h6" gutterBottom>
                Marriages Completed
              </Typography>
              <Typography variant="h4">
                <CountUp
                  end={counterData?.completeMarried}
                  duration={5}
                  className="text-2xl font-semibold"
                />
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SuccessCounterSection;
