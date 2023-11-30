// HowItWorksSection.jsx

import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const cardStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
};

const sectionStyle = {
  background: '#F3F3F4', 
  color: '#272727',
  padding: '64px 0',
  marginBottom:'20px'
};

const HowItWorkSection = () => {
  return (
    <div style={sectionStyle}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#E33183'}}>
        Dour Path to Happily Ever After
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Create Your Profile
                </Typography>
                <Typography>
                  Sign up and create a detailed profile with your information and preferences.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Explore Biodatas
                </Typography>
                <Typography>
                  Browse through a variety of biodatas to find potential matches based on your criteria.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Connect and Contact
                </Typography>
                <Typography>
                  If you find a biodata that you prefer, connect with the person and start your journey.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HowItWorkSection;
