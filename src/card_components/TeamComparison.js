import React from "react";
import {useState} from 'react';

import MatchUpTable from './MatchUpTable';
import ConjectureDialog from './MatchupDialog/MatchupDialog';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TeamCard from './TeamCard';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function TeamComparison(props) {
    const [showDetail, setShowDetail] = useState(false);
    const [showLines, setShowLines] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogTab, setDialogTab] = useState(null);
    const [requestSubmitted, setRequestSubmitted] = React.useState(false)

    console.log(`requestSubmitted: ${requestSubmitted}`)

    function setSubmitted(status) {
      setRequestSubmitted(status)
      }

    function openDialog(state) {
    setShowDialog(state)
    }

    const openDetail = event => {
        openDialog(true);
        setDialogTab("detail")
    }

    const openConjecture = event => {
        openDialog(true);
        setDialogTab("conjecture")
    }

    function pointsToScore(home_points, away_points) {
        const score = Math.round(home_points).toString() + ' - ' + Math.round(away_points).toString()
    return score
    };

    function overUnderCalc(home_points, away_points) {
        const overUnder = Math.round(home_points) + Math.round(away_points)
        return overUnder
    };

       const visuals = {home_logo: props.lineDetails.home_logo,
                                 home_title: props.lineDetails.home,
                                 away_logo: props.lineDetails.away_logo,
                                 away_title: props.lineDetails.away
                       }

       const lineSummary = [
        {
        category: "Pred Score (H-A)",
        oldst: pointsToScore(props.lineDetails.home_pred_points,
            props.lineDetails.away_pred_points),
        vegas: props.lineDetails.betting_spread
        },
        {
            category: "Over/Under",
            oldst: overUnderCalc(props.lineDetails.home_pred_points,
                props.lineDetails.away_pred_points),
            vegas: props.lineDetails.betting_o_u
        }
   ]

    const gameDetails = [
            {
                stat: "ELO",
                home: props.lineDetails.home_elo,
                away: props.lineDetails.away_elo
            },
            {
                stat: "Talent Rating",
                home: (Math.round(props.lineDetails.home_talent_rating * 1000) / 1000),
                away: (Math.round(props.lineDetails.away_talent_rating * 1000) / 1000)
            }
        ]


    return(
       <div>
        <Box sx={{
                display: 'grid',
                gap: .25,
                borderRadius: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: '#c5c6d0',
                maxWidth: 350
                }}>
                <Box>
                    <Box sx={{
                                display: 'flex',
                                gap: 1,
                                flexDirection: 'row',
                                paddingLeft: 1,
                                paddingRight: 1,
                                paddingTop: 1,
                                borderRadius: 1,
                                justifyContent: 'center',
                                }}
                                >
                        <TeamCard img={props.lineDetails.home_logo}
                                  title={"(H) " + props.lineDetails.home}
                                  cardMaxWidth={"auto"}
                                  mediaMaxHeight={"auto"}
                        />
                        <TeamCard img={props.lineDetails.away_logo}
                                  title={props.lineDetails.away}
                                  cardMaxWidth={"auto"}
                                  mediaMaxHeight={"auto"}
                        />
                    </Box>
                   <Box sx={{marginTop: .5,
                                display: 'flex',
                                paddingLeft: 1,
                                paddingRight: 1,
                                borderRadius: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',}}>
                     <MatchUpTable
                         lineSummary = {lineSummary}
                         gameDetails = {gameDetails}
                         showLines = {showLines}
                         showDetail = {showDetail}
                     />
                    </Box>
                </Box>

                <Box sx={{display: 'flex',
                          marginTop: .5,
                          marginBottom: .5,
                          gap: 2,
                          flexDirection: 'row',
                          justifyContent: 'center',}}>

                          <Button size='small' variant="outlined" onClick={openConjecture} >
                                Conjecture
                          </Button>
                        <Button size='small' onClick={openDetail} variant="contained">
                                Show Details
                        </Button>
                        {(showDialog &&
                            <ConjectureDialog
                                visuals={visuals}
                                spreadSummary = {lineSummary}
                                gameId = {props.lineDetails.game_id}
                                gameDetails = {gameDetails}
                                startingTab = {dialogTab}
                                setSubmitted = {setSubmitted}
                                openDialog = {openDialog}
                                showDialog = {showDialog}
                                >
                            </ConjectureDialog>
                        )}
                  <Snackbar open={requestSubmitted} autoHideDuration={3000} onClose={() => {setRequestSubmitted(false)}}>
                      <Alert onClose={() => {setRequestSubmitted(false)}} severity="success" sx={{ width: '100%' }}>
                        Your conjecture has been submitted!
                      </Alert>
                 </Snackbar>

                </Box>

            </Box>
       </div>

    )
}