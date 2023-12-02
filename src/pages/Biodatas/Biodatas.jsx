import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BiodataCard from "./BiodataCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Helmet } from "react-helmet-async";

const Biodatas = () => {
  const [searchInput, setSearchInput] = useState("");
  const [biodata, setBiodata] = useState([]);
  const [displayedBiodata, setDisplayedBiodata] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  //  handle all biodata button
  const handleShowAllBiodata = () => {
    setDisplayedBiodata(biodata);
  };
  // handle search value
  const handleSearch = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  useEffect(() => {
    axiosSecure.get("/biodatas").then((res) => {
      setBiodata(res.data);
      const filteredBiodata = res.data.filter((item) => {
        const searchTerms = [
          item.age,
          item.biodataType,
          item.permanentDivision,
        ].map(String);

        const searchString = searchTerms.join(" ").toLowerCase();
        return searchString.includes(searchInput);
      });
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedBiodata = filteredBiodata.slice(startIndex, endIndex);
      setDisplayedBiodata(paginatedBiodata);
      setLoading(false);
    });
  }, [axiosSecure, searchInput, currentPage]);
  if (loading) {
    return (
      <Box
        sx={{
          p: 8,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          color:'#E33183',
          fontSize:'30px'
        }}
      >
        Loading
      </Box>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ mx: "auto" }}>
      <Helmet>
        <title>Matri-marry || Biodatas</title>
      </Helmet>
      <form>
        <label style={{ color: "#E33183" }}>Search here</label>
        <Grid sx={{ display: "flex", gap: "10px" }}>
          <input
            onChange={handleSearch}
            type="text"
            value={searchInput}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid",
              width: "500px",
            }}
            placeholder="Search age,male or female..."
            required
          />
          <Button
            variant="outlined"
            color="secondary"
            sx={{ textTransform: "initial" }}
            onClick={handleShowAllBiodata}
          >
            All Created Biodata
          </Button>
        </Grid>
      </form>
      <Grid container spacing={2}>
        {displayedBiodata.map((biodata) => (
          <Grid key={biodata._id} item xs={12} md={4}>
            <BiodataCard biodata={biodata} />
          </Grid>
        ))}
      </Grid>
      <Grid>
        <Stack spacing={2} style={{ marginBottom: "10px" }}>
          <Pagination
            sx={{
              width: "380px",
              display: "flex",
              justifyContent: "flex-end",
            }}
            count={Math.ceil(biodata.length / itemsPerPage)}
            // page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </Grid>
    </Container>
  );
};

export default Biodatas;
