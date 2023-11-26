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