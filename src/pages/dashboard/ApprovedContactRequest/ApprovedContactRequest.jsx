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

export default function ApprovedContactRequest() {
  const axiosSecure = useAxiosSecure();

  const { data: contactRequestData = [], refetch } = useQuery({
    queryKey: ["ContactData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-contact/requested-data");
      return res?.data;
    },
  });
 
  const handleStatusUpdate = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to convert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/update-status/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: "Your file has been update.",
              icon: "success",
              timer: 1500,
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
             Approve Contact 
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactRequestData.map((item, index) => (
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
                onClick={() => handleStatusUpdate(item?.biodataId)}
                align="center"
               
              >
                <Button  style={{
                  color: item.status === "approved" ? "green" : "red",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  textTransform:'capitalize'
                }}>
                  {item.status}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
