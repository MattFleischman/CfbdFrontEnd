/*
** React CORS friendly Single Page Application - https://github.com/aws-samples/react-cors-spa 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import bobbyPetrinoBliss from './bobby_petrino_bliss.png';
import muschampGrimace from './muschamp_grimace.png';
import stevenPlockerSurprise from './Steven_Plocker_Surprise.png';
import * as React from 'react';
import './App.css';
import { useFetch } from "react-async";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BoxScore from './BoxScore';
import { makeStyle } from '@mui/core/styles';

const useStyles = makeStyles({
    boxScoreContainer: {
        paddingTop: '20px',
        paddingLeft: '50px'
    }
})

// To be replaced by the endpoint of the API deployed through the CloudFormation Template
/*const APIEndPoint = 'https://gnnktks9vh.execute-api.us-east-1.amazonaws.com/v1/hello' */

/*const APIResult = () => {
  const { data, error } = useFetch(APIEndPoint, {
    headers: { accept: "application/json" },
  })
  if (error) return <p>{error.message}</p>
  if (data) return <p>{data.message}</p>
  return null
}
*/


function App() {
  const classes = useStyles()
  return (
    <div> {/*
        <div className="App">
            <header className="App-header">
              <p> Hello fellow degenerates </p>
              <img src={stevenPlockerSurprise} className="App-MainLogo" alt="logo" />
            </header>
            <p>Welcome to OldSpruceTree&apos;s College Football Score Predictor <br/> Pick a match-up below to predict scores </p>
            <div className="logos">
                <img src={bobbyPetrinoBliss} className="App-logoR2L" alt="logo S3" />
                <img src={muschampGrimace} className="App-logoL2R" alt="logo CloudFront" />

            </div>
        </div> */}
        {<Grid container spacing={2} className={classes.boxScoreContainer}>
            <Grid item xs={4}>
                this is item 1
                {/*<BoxScore/>*/}
            </Grid>
            <Grid item xs={4}>
                this is item 2
                {/*<BoxScore/>*/}
            </Grid>
        </Grid>}
    </div>

  );
}




export default App;
