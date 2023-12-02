import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

export default function DenseTable() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: favoritesData = [], refetch } = useQuery({
    queryKey: ["favoritesData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite-data?email=${user?.email}`);
      return res?.data;
    },
  });
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
              timer: 1500
            });
          }
        });
      }
    });
  };
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Helmet>
        <title>Dashboard || Favorites</title>
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
              Biodata Id
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Permanent Address
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Occupation
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
          {favoritesData.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {item?.name}
              </TableCell>
              <TableCell align="center">{item?.biodataId}</TableCell>
              <TableCell align="center">{item?.permanentAddress}</TableCell>
              <TableCell align="center">{item?.occupation}</TableCell>
              <TableCell
                onClick={() => handleDeleteFavorite(item._id)}
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
