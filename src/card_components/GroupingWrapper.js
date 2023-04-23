import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import OuSpreadGroupings from './OuSpreadGroupings';
import ConfGroupings from './ConfGroupings';





export default function GroupingWrapper(props) {
    const [gameLines, setGameLines] = useState([]);
    const [fetchCompleted, setFetchCompleted] = useState(false);
    const [ouSpreadGroups, setOuSpreadGroups] = useState()
    const [confGroups, setConfGroups] = useState()

    const StaticSpreadGroups = {'Huge': [],
                                'Large': [],
                                'Medium': [],
                                'Small': [],
                                'Tiny': []
                                }
    const StaticConfGroups = {'SEC': [],
                               'Pac-12': [],
                                'Big Ten': [],
                                'Big 12': [],
                                'ACC': [],
                                'Mountain West': [],
                                'Conference USA': [],
                                'Mid-American': [],
                                'Sun Belt': [],
                                'American': [],
                                'FBS Independents': [],
                                'Inter': []
                                }

    const ouSpreadDiffGroupings = (gameLines) => {
        console.log(`gameLines length: ${gameLines.length}`)
        var TempGroupings = StaticConfGroups;

        for (let i=0; i < gameLines.length; i++) {
        let vegasOU = gameLines[i].betting_o_u;
        let ostreeOU = gameLines[i].home_pred_points + gameLines[i].away_pred_points;
        let ouDiff = Math.abs(vegasOU - ostreeOU)
        //console.log(`vegasOU: ${vegasOU} - ostreeOU: ${ostreeOU} - ABS diff: {ouDiff}`);

        if (ouDiff >= 9) {
           TempGroupings['Huge'].push(gameLines[i])
           }
        else if ((ouDiff < 9) && (ouDiff >= 6)) {
            TempGroupings['Large'].push(gameLines[i])
            }
        else if ((ouDiff < 6) && (ouDiff >= 3.5)) {
            TempGroupings['Medium'].push(gameLines[i])
            }
        else if ((ouDiff < 3.5) && (ouDiff >= 1)) {
            TempGroupings['Small'].push(gameLines[i])
            }
        else {
            TempGroupings['Tiny'].push(gameLines[i])
            }
        }

         /*console.log(`TempGroupings Huge Length: ${TempGroupings['Huge'].length}`)
         console.log(`TempGroupings Large Length: ${TempGroupings['Large'].length}`)
         console.log(`TempGroupings Medium Length: ${TempGroupings['Medium'].length}`)
         console.log(`TempGroupings Small Length: ${TempGroupings['Small'].length}`)
         console.log(`TempGroupings Tiny Length: ${TempGroupings['Tiny'].length}`)*/

         return TempGroupings
    }

    const conferenceDiffGroupings = (gameLines) => {
        console.log(`gameLines length: ${gameLines.length}`)
        var TempGroupings = StaticConfGroups;

        for (let i=0; i < gameLines.length; i++) {
        let homeConf = gameLines[i].home_conference;
        let awayConf = gameLines[i].away_conference;
        //console.log(`vegasOU: ${vegasOU} - ostreeOU: ${ostreeOU} - ABS diff: {ouDiff}`);

        if (awayConf == homeConf) {
           if (homeConf == '') {

           }
           else if (homeConf == 'SEC') {
                TempGroupings['SEC'].push(gameLines[i])
           }
           else if (homeConf == 'Pac-12') {
                TempGroupings['Pac-12'].push(gameLines[i])
           }
           else if (homeConf == 'Big Ten') {
                TempGroupings['Big Ten'].push(gameLines[i])
           }
           else if (homeConf == 'Big 12') {
                TempGroupings['Big 12'].push(gameLines[i])
           }
           else if (homeConf == 'ACC') {
                TempGroupings['ACC'].push(gameLines[i])
           }
           else if (homeConf == 'Mountain West') {
                TempGroupings['Mountain West'].push(gameLines[i])
           }
           else if (homeConf == 'Conference USA') {
                TempGroupings['Conference USA'].push(gameLines[i])
           }
           else if (homeConf == 'Mid-American') {
                TempGroupings['Mid-American'].push(gameLines[i])
           }
           else if (homeConf == 'Sun Belt') {
                TempGroupings['Sun Belt'].push(gameLines[i])
           }
           else if (homeConf == 'American Athletic') {
                TempGroupings['American'].push(gameLines[i])
           }
           else if (homeConf == 'FBS Independents') {
                TempGroupings['FBS Independents'].push(gameLines[i])
           }
            }

        else {
            TempGroupings['Inter'].push(gameLines[i])
            }
        }

         /*console.log(`TempGroupings Huge Length: ${TempGroupings['Huge'].length}`)
         console.log(`TempGroupings Large Length: ${TempGroupings['Large'].length}`)
         console.log(`TempGroupings Medium Length: ${TempGroupings['Medium'].length}`)
         console.log(`TempGroupings Small Length: ${TempGroupings['Small'].length}`)
         console.log(`TempGroupings Tiny Length: ${TempGroupings['Tiny'].length}`)*/

         return TempGroupings
    }


    const fetchGameLines = async (week) => {
    console.log(`fetching game prediction results for week: ${week}`)
    const response = await axios
        .get(`https://f8f9t7ilzf.execute-api.us-east-1.amazonaws.com/Prod/prediction_output?week=${week}`)
        .catch((err) => console.log(err));
    if (response) {
        const gameLines = response.data;

        console.log("GameLines: ", gameLines);
        setGameLines(gameLines);
        setConfGroups(conferenceDiffGroupings(gameLines));
        setFetchCompleted(true);
                }
    };

        useEffect(() => {
            fetchGameLines(props.week);
        }, [props.week]);



    return(
        <div>

            {!fetchCompleted &&
                <div className = "matchup_spinner__wrapper">
                    <CircularProgress size= '4rem'/>
                </div>
            }

            <Stack
            direction="column"
            spacing={2}
            >
                {fetchCompleted &&
                (() => {
                  const spreadGroups = [];

                  for (const [key, value] of Object.entries(confGroups)) {
                    spreadGroups.push(<ConfGroupings
                          groupVal = {key}
                          lineDetails = {confGroups[key]}
                    />);
                    }

                    return spreadGroups;
                    })()
                  }
            </Stack>
        </div>
    )
}