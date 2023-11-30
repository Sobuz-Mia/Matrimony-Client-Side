import { Button, Container, Grid} from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BiodataCard from "./BiodataCard";


const Biodatas = () => {
  const [searchInput, setSearchInput] = useState("");
  const [biodata,setBiodata] = useState([]);
  const [displayedBiodata, setDisplayedBiodata] = useState([]);
  const axiosSecure = useAxiosSecure();

  const handleShowAllBiodata = () => {
    setDisplayedBiodata(biodata);
  };
 
  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value.toLowerCase())

  };
  useEffect(() => {
    axiosSecure.get("/biodatas").then((res) => {
      setBiodata(res.data)
      const filteredBiodata = res.data.filter((item) => {
        const searchTerms = [
          item.age,
          item.biodataType,
          item.permanentDivision,
        ].map(String);

        const searchString = searchTerms.join(" ").toLowerCase();
        return searchString.includes(searchInput);
      });

      setDisplayedBiodata(filteredBiodata);
    });
  }, [axiosSecure,searchInput]);
 

  return (
    <Container maxWidth="lg" sx={{ mx: "auto" }}>
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
    </Container>
  );
};

export default Biodatas;
