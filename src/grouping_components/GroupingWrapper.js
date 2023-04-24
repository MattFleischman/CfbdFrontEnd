import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import GroupingDisplay from './GroupingDisplay';
import {StaticSpreadGroups, StaticConfGroups} from './GroupingConstants'


export default function GroupingWrapper(props) {
    const [gameLines, setGameLines] = useState([]);
    const [fetchCompleted, setFetchCompleted] = useState(false);
    const [ouSpreadGroups, setOuSpreadGroups] = useState([])
    const [confGroups, setConfGroups] = useState([])
    const [groupings, setGroupings] = useState(null)


    const getGroupings = () => {
    console.log(`grouping: ${localStorage.getItem("matchupDisplay")}`)
    let setting = localStorage.getItem("matchupDisplay") || 'conference'
    if (setting == 'conference') {
        return confGroups
        }
    else {
        return ouSpreadGroups
        }
    }

    useEffect(() => {
    setGroupings(getGroupings())
    }, [localStorage.getItem("matchupDisplay")]);


    const ouSpreadDiffGroupings = (gameLines) => {
        var TempGroupings = StaticSpreadGroups;

        for (let i=0; i < gameLines.length; i++) {
        let vegasOU = gameLines[i].betting_o_u;
        let ostreeOU = gameLines[i].home_pred_points + gameLines[i].away_pred_points;
        let ouDiff = Math.abs(vegasOU - ostreeOU)

        if (ouDiff >= 9) {
           TempGroupings['Huge Diff (9+)'].push(gameLines[i])
           }
        else if ((ouDiff < 9) && (ouDiff >= 6)) {
            TempGroupings['Large Diff (6 - 9)'].push(gameLines[i])
            }
        else if ((ouDiff < 6) && (ouDiff >= 3.5)) {
            TempGroupings['Medium Diff (3.5 - 6)'].push(gameLines[i])
            }
        else if ((ouDiff < 3.5) && (ouDiff >= 1)) {
            TempGroupings['Small Diff (1 - 3.5)'].push(gameLines[i])
            }
        else {
            TempGroupings['Tiny Diff (<=1)'].push(gameLines[i])
            }
        }

         return TempGroupings
    }

    const conferenceGroupings = (gameLines) => {

        var TempGroupings = StaticConfGroups;

        for (let i=0; i < gameLines.length; i++) {
        let homeConf = gameLines[i].home_conference;
        let awayConf = gameLines[i].away_conference;
        //console.log(`vegasOU: ${vegasOU} - ostreeOU: ${ostreeOU} - ABS diff: {ouDiff}`);

        if (awayConf == homeConf) {
           if (homeConf == '') {

           }
           else if (homeConf == 'SEC') {
                TempGroupings['SEC Conference'].push(gameLines[i])
           }
           else if (homeConf == 'Pac-12') {
                TempGroupings['Pac-12 Conference'].push(gameLines[i])
           }
           else if (homeConf == 'Big Ten') {
                TempGroupings['Big Ten Conference'].push(gameLines[i])
           }
           else if (homeConf == 'Big 12') {
                TempGroupings['Big 12 Conference'].push(gameLines[i])
           }
           else if (homeConf == 'ACC') {
                TempGroupings['ACC Conference'].push(gameLines[i])
           }
           else if (homeConf == 'Mountain West') {
                TempGroupings['Mountain West Conference'].push(gameLines[i])
           }
           else if (homeConf == 'Conference USA') {
                TempGroupings['Conference USA Conference'].push(gameLines[i])
           }
           else if (homeConf == 'Mid-American') {
                TempGroupings['Mid-American Conference'].push(gameLines[i])
           }
           else if (homeConf == 'Sun Belt') {
                TempGroupings['Sun Belt Conference'].push(gameLines[i])
           }
           else if (homeConf == 'American Athletic') {
                TempGroupings['American Conference'].push(gameLines[i])
           }
           else if (homeConf == 'FBS Independents') {
                TempGroupings['FBS Independents Conference'].push(gameLines[i])
           }
            }

        else {
            TempGroupings['Inter-Conference'].push(gameLines[i])
            }
        }
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
        setConfGroups(conferenceGroupings(gameLines));
        setOuSpreadGroups(ouSpreadDiffGroupings(gameLines));
        setFetchCompleted(true);
                }
    };
        useEffect(() => {
            fetchGameLines(props.week);
        }, [props.week]);

    console.log(`groupings: ${groupings}`)
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
                  const groups = [];

                  for (const [key, value] of Object.entries(getGroupings())) {
                    groups.push(<GroupingDisplay
                          groupVal = {key}
                          lineDetails = {value}
                    />);
                    }

                    return groups;
                    })()
                  }
            </Stack>
        </div>
    )
}