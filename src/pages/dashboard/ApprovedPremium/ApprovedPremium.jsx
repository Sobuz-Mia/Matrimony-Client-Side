import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button } from "@mui/material";
import { Helmet } from "react-helmet-async";

export default function ApprovedPremium() {
  const axiosSecure = useAxiosSecure();

  const { data: PremiumData = [], refetch } = useQuery({
    queryKey: ["PremiumData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/premium");
      return res?.data;
    },
  });

  const handlePremimuUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to convert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Convert to premium!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/premium/data/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: "Your file has been update to Premium user.",
              icon: "success",
              timer: 1500,
            });
          }
        });
      }
    });
  };
  console.log(PremiumData);
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Helmet>
        <title>Dashboard || Premium Approve</title>
      </Helmet>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: "18px", fontWeight: "bold" }}>
              SL
            </TableCell>
            <TableCell style={{ fontSize: "18px", fontWeight: "bold" }}>
              Name
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Email
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Biodata Id
            </TableCell>

            <TableCell
              align="center"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Make Premium
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {PremiumData?.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {item?.name}
              </TableCell>
              <TableCell align="center">{item?.email}</TableCell>
              <TableCell align="center">{item?.biodataId}</TableCell>
              <TableCell
                onClick={() => handlePremimuUser(item?.biodataId)}
                align="center"
              >
               <Button variant="outlined" color="secondary" style={{textTransform:'capitalize'}}>
               {item?.premiumRequest === "Pending" ?"Pending" :"Approved"}
               </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
