import React from "react";
import {useState} from 'react';

import MatchUpTable from './MatchUpTable';
import ConjectureDialog from './MatchupDialog/MatchupDialog';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TeamCard from './TeamCard';


export default function TeamComparison(props) {
    const [showDetail, setShowDetail] = useState(false);

    const manageDetail = event => {
        setShowDetail(current => !current);
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
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden'
                }}>
                <Box>
                    <Box sx={{
                                display: 'flex',
                                gap: 1,
                                flexDirection: 'row',
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
                                flexDirection: 'row',
                                justifyContent: 'center',}}>
                     <MatchUpTable
                         lineSummary = {lineSummary}
                         gameDetails = {gameDetails}
                         showDetail = {showDetail}
                     />
                    </Box>
                </Box>

                <Box sx={{display: 'flex',
                          marginTop: .4,
                          gap: 2,
                          flexDirection: 'row',
                          justifyContent: 'center',}}>
                    <div>
                        <ConjectureDialog
                            buttonLabel="Conjecture"
                            visuals={visuals}
                            spreadSummary = {lineSummary}
                            gameId = {props.lineDetails.game_id}
                            >
                        </ConjectureDialog>
                   </div>

                    <div>
                        <Button size='small' onClick={manageDetail} variant="contained">Show Details</Button>
                   </div>
                </Box>

            </Box>
       </div>

    )
}