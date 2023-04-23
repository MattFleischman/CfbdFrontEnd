
import bobbyPetrinoBliss from './bobby_petrino_bliss.png';
import muschampGrimace from './muschamp_grimace.png';
import stevenPlockerSurprise from './Steven_Plocker_Surprise.png';
import audio_intro from './audio_intro.mp3';
import React from "react";
import { useState, useEffect } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import { Navigate } from "react-router-dom";
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


//import weekOptions from './Utilities/Constants';

function App() {
    const {weekOptions} = require('./Utilities/Constants')
    const [weekValue, setWeekValue] = useState("13")
    const [isShowingAlert, setShowingAlert] = React.useState(true);
    const [homeAuthenticated, setHomeAuthenticated] = useState(false);


      function playIntroAudio() {
      setShowingAlert(false)
      new Audio(audio_intro).play()
      }
    //TODO: Need to enable sign out and check when the login token expires
  console.log("starting app")
  console.log(`login name: ${localStorage.getItem("loginName")}`)



  if ((!localStorage.getItem("authenticated")) || (!localStorage.getItem("loginId"))) {
      console.log(`homeAuthenticated: ${localStorage.getItem("authenticated")}`)
      console.log(`login id: ${localStorage.getItem("loginId")}`)
    return <Navigate replace to="/login" />;
  } else {
    console.log(`homeAuthenticated: ${localStorage.getItem("authenticated")}`)
    console.log(`login id: ${localStorage.getItem("loginId")}`)
    return (
      <div>
          <div className="App">
              <AppHeader
                    userImage={localStorage.getItem("userImage")}
                    userName={localStorage.getItem("loginName")}
                    >

              </AppHeader>
              <header className="App-header">
                <h1> Hello fellow degenerates </h1>
                {isShowingAlert &&
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isShowingAlert}
                  >
                  <Alert onClose={playIntroAudio} sx={{textAlign: 'left'}} severity="warning">
                    <AlertTitle sx={{textAlign: 'center'}}>Take it easy {localStorage.getItem("loginName").split(" ")[0]}</AlertTitle>
                      This site is still under construction.
                      <br/>For a pre-alpha taste turn sound on and play around.
                      <br/>IDK, maybe place a couple conjectures, I can't track you down... for now.
                      <br/><br/>Also please no DoS attacks :)
                      </Alert>
                  </Backdrop>
                  }
                <img src={stevenPlockerSurprise} className="App-MainLogo" alt="logo" />
              </header>
              <h3>Welcome to OldSpruceTree&apos;s College Football Score Predictor <br/> Select an option above to dig into CFB predictions </h3>
              <div className="logos">
                  <img src={bobbyPetrinoBliss} className="App-logoR2L" alt="logo S3" />
                  <img src={muschampGrimace} className="App-logoL2R" alt="logo CloudFront" />
              </div>
          </div>
      </div>
     );
    }
  };




export default App;
