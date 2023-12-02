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
import { useState } from "react";
import { Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";

export default function ManageUser() {
  const axiosSecure = useAxiosSecure();
  const [searchValue, setSearchValue] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users",searchValue],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchValue}`);
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
        axiosSecure.patch(`/user/premium/${id}`).then((res) => {
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
  return (
    <>
      <Grid sx={{display:'flex',flexDirection:'column',gap:'5px',mt:'5px'}}>
        <Helmet>
          <title>Dashboard || Manage User</title>
        </Helmet>
        <label style={{ color: "#E33183" ,fontSize:'20px'}}>Search user</label>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          value={searchValue}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid",
            width: "300px",
          }}
          placeholder="Search user name"
          required
        />
      </Grid>

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
                  onClick={() => handleMakeAdmin(item?._id)}
                  align="center"
                  sx={{ fontSize: "20px" }}
                >
                  {item?.role == "Admin" ? "Admin" : <FaEdit />}
                </TableCell>
                <TableCell
                  onClick={() => handlePremimuUser(item?._id)}
                  align="center"
                  style={{ color: "red", fontSize: "20px" }}
                >
                  {item?.userStatus == "premium" ? (
                    "Premium"
                  ) : (
                    <TbPremiumRights />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
