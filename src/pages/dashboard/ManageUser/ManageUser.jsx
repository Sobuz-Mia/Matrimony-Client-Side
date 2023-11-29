import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { TbPremiumRights } from "react-icons/tb";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function ManageUser() {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res?.data;
    },
  });
  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Update!",
              text: "User update to Admin.",
              icon: "success",
              timer: 1500,
            });
          }
        });
      }
    });
  };
  const handleDeleteFavorite = (id) => {
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
        axiosSecure.delete(`/delete-favorite/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
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
              Make Admin
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
          {users.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {item?.userName}
              </TableCell>
              <TableCell align="center">{item?.email}</TableCell>
              <TableCell
                onClick={() => handleMakeAdmin(item._id)}
                align="center"
                sx={{ fontSize: "20px" }}
              >
                <FaEdit />
              </TableCell>
              <TableCell
                onClick={() => handleDeleteFavorite(item._id)}
                align="center"
                style={{ color: "red", fontSize: "20px" }}
              >
                <TbPremiumRights />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
