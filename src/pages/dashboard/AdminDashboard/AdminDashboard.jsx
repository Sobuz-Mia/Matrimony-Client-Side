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
            fontWeight: "bold",
            mt:5
          }}
        >
          <Typography sx={{ fontSize: "25px"}}>
            Total Revenue = <span style={{color:'#E33183'}}>{allCountData?.totalRevenue}</span> Tk Only
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
              <TableCell component="th" scope="row">
                {allCountData?.totalBio && allCountData?.totalBio}
              </TableCell>

              <TableCell align="center">
                {allCountData?.maleData && allCountData?.maleData}
              </TableCell>

              <TableCell align="center">
                {allCountData?.femaleData && allCountData?.femaleData}
              </TableCell>

              <TableCell align="center">
                {allCountData?.premiumData && allCountData?.premiumData}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminDashboard;
