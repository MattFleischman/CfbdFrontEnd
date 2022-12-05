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
import BoxScore from './BoxScore';

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
        </div>

        <div className="outer_card__wrapper">
        {/*<h2 style={{textAlign:"center"}}> Purdue vs Michigan </h2>*/}

            <div className="sub_card__wrapper">

                <BoxScore img="http://a.espncdn.com/i/teamlogos/ncaa/500-dark/2509.png"
                          title="Away: Purdue"
                          description = "Stats and Betting Lines"/>
                <BoxScore img="http://a.espncdn.com/i/teamlogos/ncaa/500-dark/130.png"
                          title="Home: Michigan"
                          description = "Stats and Betting Lines"/>
            </div>

            {/*<p style={{textAlign:"center"}}>Game summary section </p>*/}
        </div>



    </div>

  );
}




export default App;
