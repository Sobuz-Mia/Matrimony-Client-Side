<Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5">Similar Biodata</Typography>
          {similarBiodata.map((similar) => (
            <div key={similar._id}>
              <Typography variant="body1">{similar.name}</Typography>
              {/* Display other similar biodata details here */}
              <Typography variant="body2">Gender: {similar.gender}</Typography>
              <Typography variant="body2">
                Division: {similar.division}
              </Typography>
              {/* Add other details here */}
            </div>
          ))}
        </Paper>
      </Grid>


<Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: 400, margin: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={biodata.photoUrl}
            alt="Profile Image"
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Biodata ID: {biodata.biodataId}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Name: {biodata.name}
            </Typography>
            <Grid sx={{ display: "flex", gap: "20px" }}>
              <Typography variant="body2" color="text.secondary">
                Gender: {biodata.gender === "male" ? "Male" : "Female"}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Permanent Division: {biodata.permanentDivision}
              </Typography>
            </Grid>
            <Typography variant="body2" color="text.secondary">
              Age: {biodata.age}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date of Birth: {biodata.dateOfBirth}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Occupation: {biodata.occupation}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Race: {biodata.race}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Weight: {biodata.weight}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Father Name: {biodata.fatherName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mother Name: {biodata.motherName}
            </Typography>
          </CardContent>
          <Grid container justifyContent="center" alignItems="center">
            <Button variant="contained" color="secondary" sx={{ mb: 3 }}>
              Add to favourites
            </Button>

            <Link to={`/detailsPage/${biodata._id}`}>
              <Button variant="contained" color="secondary" sx={{ mb: 3 }}>
                Request for contact information
              </Button>
            </Link>
          </Grid>
        </Card>
      </Grid>
