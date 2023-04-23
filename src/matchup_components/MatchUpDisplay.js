import React from "react";
import { useState, useEffect } from 'react';
import '../App.css';
import GroupingWrapper from '../card_components/GroupingWrapper';
import AppHeader from '../AppHeader';
import { Navigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
//import {weekOptions} from "./Utilities/Constants";
//import { purple } from "@mui/material/colors";

//import weekOptions from './Utilities/Constants';

export default function MatchUpDisplay() {
    const {weekOptions} = require('../Utilities/Constants')
    const [weekValue, setWeekValue] = useState("13")
    const [isShowingAlert, setShowingAlert] = React.useState(true);
    const [homeAuthenticated, setHomeAuthenticated] = useState(false);

    const weekChange = (e) => {
        console.log("Week Selected: " + e.target.value);
        setWeekValue(e.target.value);
        };

//TODO: Need to enable sign out and check when the login token expires
  console.log("starting app")
  console.log(`login name: ${localStorage.getItem("loginName")}`)
  console.log(`login Id: ${localStorage.getItem("loginId")}`)
  if (!localStorage.getItem("authenticated")) {
      console.log(`homeAuthenticated: ${localStorage.getItem("authenticated")}`)
    return <Navigate replace to="/login" />;
  } else {
    console.log(`homeAuthenticated: ${localStorage.getItem("authenticated")}`)
    return (
      <div>
          <div className="App">
              <AppHeader
                    userImage={localStorage.getItem("userImage")}
                    userName={localStorage.getItem("loginName")}
                    currentNav='/matchUp' /*Look for a non hard coded way of defining current page*/
                    >
              </AppHeader>
              <header className="App-header">
                <h1> Game MatchUps </h1>
              </header>
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

       <GroupingWrapper
           week = {weekValue}
       />

   </div>

     );
    }
   };

