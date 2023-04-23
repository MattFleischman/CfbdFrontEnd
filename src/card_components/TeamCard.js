import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function TeamCard(props) {
    const CardContentNoPadding = styled(CardContent)(`
      padding: 0;
      &:last-child {
        padding-bottom: 0;
      }
    `);
  return (
      <Card sx={{ maxWidth: props.cardMaxWidth
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
                            maxwidth: "auto",
                            minwidth: 30,
                            maxHeight: props.mediaMaxHeight
                          }}
                    image={props.img}
                    title="team image"
                  />
          </div>
          <CardContentNoPadding sx={{paddingBottom: 1}}>
           <Typography
               align="center"
               variant="h7"
               component="div"
               >
                {props.title}
            </Typography>
          </CardContentNoPadding>
    </Card>
  );
}