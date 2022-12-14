import bobbyPetrinoBliss from './bobby_petrino_bliss.png';
import muschampGrimace from './muschamp_grimace.png';
import stevenPlockerSurprise from './Steven_Plocker_Surprise.png';
import React, { useState } from 'react';
import './App.css';
import { useFetch } from "react-async";
import BoxScore from './BoxScore';
import GameLineTable from './GameLineTable';
import tw from "twin.macro";
import { Dropdown, Option } from './WeekSelectDropdown';


const weekOptions = [

  {
    label: "2022: Week 13",
    value: 13,
  },
  {
    label: "2022: Week 12",
    value: 12,
  },
  {
    label: "2022: Week 11",
    value: 11,
  },
  {
    label: "2022: Week 10",
    value: 10,
  },
  {
    label: "2022: Week 9",
    value: 9,
  },
  {
    label: "2022: Week 8",
    value: 8,
  },
  {
    label: "2022: Week 7",
    value: 7,
  },
  {
    label: "2022: Week 6",
    value: 6,
  },
  {
    label: "2022: Week 5",
    value: 5,
  },
  {
    label: "2022: Week 4",
    value: 4,
  },


];


export default function App() {
    const AppContainer = tw.div`
      w-full
      max-w-full
      flex
      flex-col
      items-center
      justify-center
      pt-6
      pb-10
      pl-10
      pr-10
    `;

    const [weekValue, setWeekValue] = useState("13")
    const weekChange = (e) => {
        console.log("Week Selected: " + e.target.value);
        setWeekValue(e.target.value);
        };

  return (
    <div>
        <div className="App">
            <header className="App-header">
              <h1> Hello fellow degenerates </h1>
              <img src={stevenPlockerSurprise} className="App-MainLogo" alt="logo" />
            </header>
            <p>Welcome to OldSpruceTree&apos;s College Football Score Predictor <br/> Pick a week below for predictions: </p>
            <div className="logos">
                <img src={bobbyPetrinoBliss} className="App-logoR2L" alt="logo S3" />
                <img src={muschampGrimace} className="App-logoL2R" alt="logo CloudFront" />
            </div>
            <select value={weekValue} onChange={weekChange}>
            {weekOptions.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
       <AppContainer>
            <GameLineTable week={weekValue}/>
        </AppContainer>


    </div>

  );
}

