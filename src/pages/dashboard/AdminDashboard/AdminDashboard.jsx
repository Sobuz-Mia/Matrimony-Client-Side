import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allCountData = {} } = useQuery({
    queryKey: ["allDataCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/count-data");
      return res?.data;
    },
  });
 
  return (
    <>
      {allCountData?.totalRevenue && (
        <Paper
          elevation={2}
          sx={{
            maxWidth: "fit-Content",
            my: "5px",
            padding: "5px",
            fontWeight:'bold',
            
          }}
        >
          <Typography color={"secondary"} sx={{fontSize:'25px'}}>
            Total Revenue = {allCountData?.totalRevenue} Tk Only
          </Typography>
        </Paper>
      )}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: "18px", fontWeight: "bold" }}>
                Total Biodata
              </TableCell>
              <TableCell
                align="center"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Male Biodata
              </TableCell>
              <TableCell
                align="center"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Female Biodata
              </TableCell>
              <TableCell
                align="center"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Premium Biodata
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {allCountData?.totalBio && (
                <TableCell component="th" scope="row">
                  {allCountData?.totalBio}
                </TableCell>
              )}
              {allCountData?.maleData && (
                <TableCell align="center">{allCountData?.maleData}</TableCell>
              )}
              {allCountData?.femaleData && (
                <TableCell align="center">{allCountData?.femaleData}</TableCell>
              )}
              {allCountData?.premiumData && (
                <TableCell align="center">
                  {allCountData?.premiumData}
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminDashboard;
