import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import purdueLogo from './purdue_logo.png';
import Grid from '@mui/material/Grid';

const card = (
  <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="purdue logo"
                height="140"
                image={purdueLogo}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Purdue
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Score: 24
                Betting Line: 18
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">See Details</Button>
              </CardActions>
            </Card>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}