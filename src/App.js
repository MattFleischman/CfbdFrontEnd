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
import {useState} from 'react';
import './App.css';
import MatchUpGroups from './card_components/MatchUpGroups';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {weekOptions} from "./Utilities/Constants";
import { purple } from "@mui/material/colors";

//import weekOptions from './Utilities/Constants';

function App() {
    const {weekOptions} = require('./Utilities/Constants')

     const [weekValue, setWeekValue] = useState("13")
    const weekChange = (e) => {
        console.log("Week Selected: " + e.target.value);
        setWeekValue(e.target.value);
        };

  return (
    <div>
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
            <div>
                  <FormControl sx={{
                              m: 1,
                              minWidth: 120,
                              borderRadius: '10px',
                              backgroundColor: "#c9e1dc"
                              }}
                              size="medium">
                 <Select
                    labelId="demo-select-small"
                    id="week-select"
                    value={weekValue}
                    label="Week"
                    onChange={weekChange}
                  >
                      {weekOptions.map((option) => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
            </div>

        </div>

        <MatchUpGroups
            week = {weekValue}
        />


    </div>

  );
}




export default App;
