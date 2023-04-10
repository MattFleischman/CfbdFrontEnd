import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import OuSpreadGroupings from './OuSpreadGroupings';



export default function GroupingWrapper(props) {
    const [gameLines, setGameLines] = useState([]);
    const [fetchCompleted, setFetchCompleted] = useState(false);
    const [ouSpreadGroups, setOuSpreadGroups] = useState()

    const StaticSpreadGroups = {'Huge': [],
                                'Large': [],
                                'Medium': [],
                                'Small': [],
                                'Tiny': []
                                }

    const ouSpreadDiffGroupings = (gameLines) => {
        console.log(`gameLines length: ${gameLines.length}`)
        var TempGroupings = StaticSpreadGroups;

        for (let i=0; i < gameLines.length; i++) {
        let vegasOU = gameLines[i].betting_o_u;
        let ostreeOU = gameLines[i].home_pred_points + gameLines[i].away_pred_points;
        let ouDiff = Math.abs(vegasOU - ostreeOU)
        console.log(`vegasOU: ${vegasOU} - ostreeOU: ${ostreeOU} - ABS diff: {ouDiff}`);

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

         console.log(`TempGroupings Huge Length: ${TempGroupings['Huge'].length}`)
         console.log(`TempGroupings Large Length: ${TempGroupings['Large'].length}`)
         console.log(`TempGroupings Medium Length: ${TempGroupings['Medium'].length}`)
         console.log(`TempGroupings Small Length: ${TempGroupings['Small'].length}`)
         console.log(`TempGroupings Tiny Length: ${TempGroupings['Tiny'].length}`)

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
        setOuSpreadGroups(ouSpreadDiffGroupings(gameLines));
        setFetchCompleted(true);
                }
    };

        useEffect(() => {
            fetchGameLines(props.week);
        }, [props.week]);

  console.log("GameLine week: " + props.week)
  console.log("GameLines: " + JSON.stringify(gameLines))


    return(
        <div>

            {!fetchCompleted &&
                <div className = "matchup_spinner__wrapper">
                    <CircularProgress size= '4rem'/>
                </div>
            }

            <Stack
            direction="column"
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
            >
                {fetchCompleted &&
                (() => {
                  const spreadGroups = [];

                  for (const [key, value] of Object.entries(ouSpreadGroups)) {
                    spreadGroups.push(<OuSpreadGroupings
                          groupVal = {key}
                          lineDetails = {ouSpreadGroups[key]}
                    />);
                    }

                    return spreadGroups;
                    })()
                  }
            </Stack>
        </div>
    )
}