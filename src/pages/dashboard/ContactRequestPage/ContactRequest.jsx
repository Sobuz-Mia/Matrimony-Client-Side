import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Typography } from "@mui/material";

export default function ContactRequest() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: contactRequestData = {}, refetch } = useQuery({
    queryKey: ["contactRequestData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contact-request?email=${user?.email}`);
      return res?.data;
    },
  });
  const handleDeleteContactRequest = (id) => {
   
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contact-request/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              timer: 1500
            });
          }
        });
      }
    });
  };
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
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
              Biodata Id
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
             Status
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Mobile Number
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Contact Email
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactRequestData.length >0 && contactRequestData?.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {item?.name}
              </TableCell>
              <TableCell align="center">{item?.biodataId}</TableCell>
              <TableCell align="center">{item?.status === "approved" ? <Typography  fontWeight={'bold'} color={'green'}>{item.status}</Typography> : <Typography variant="h6" color={'secondary'}>{item.status}</Typography>}</TableCell>
              <TableCell align="center">{item.status === "approved" ? item.mobileNumber : "Your request is pending"}</TableCell>
              <TableCell align="center">{item.status === "approved" ? item.contactEmail : "Your request is pending"}</TableCell>
              <TableCell
                onClick={() => handleDeleteContactRequest(item._id)}
                align="center"
                style={{ color: "red" }}
              >
                <DeleteForeverIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
