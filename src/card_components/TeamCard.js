import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function TeamCard(props) {
  return (
      <Card sx={{ maxWidth: 380,
      }}>
          <div
              style={{
                  display: "flex",
                  alignItem: "center",
                  justifyContent: "center"
                }}
              >
                  <CardMedia
                    component="img"
                     style={{
                            width: "auto",
                            maxHeight: 150
                          }}
                    image={props.img}
                    title="team image"
                  />
          </div>
          <CardContent>
           <Typography
               gutterBottom
               align="center"
               variant="h6"
               component="div"
               >
                {props.title}
            </Typography>
          </CardContent>
    </Card>
  );
}