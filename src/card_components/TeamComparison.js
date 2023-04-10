import React from "react";
import {useState} from 'react';

import MatchUpTable from './MatchUpTable';
import ConjectureDialog from './ConjectureDialog';
import Button from '@mui/material/Button';
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
        <div className="simple_game__wrapper">
            <div className="sub_card__wrapper">
                <TeamCard img={props.lineDetails.home_logo}
                          title={"(H) " + props.lineDetails.home}
                          cardMaxWidth={150}
                          mediaMaxHeight={200}
                />
                <TeamCard img={props.lineDetails.away_logo}
                          title={props.lineDetails.away}
                          cardMaxWidth={150}
                          mediaMaxHeight={200}
                />
            </div>
           <div className="simple_game__summary">
             <MatchUpTable
                 lineSummary = {lineSummary}
                 gameDetails = {gameDetails}
                 showDetail = {showDetail}
             />
            </div>
            <div className="comparison_button_container">

                <div className="place_conjecture__button">
                    <ConjectureDialog
                        buttonLabel="Place Conjecture"
                        visuals={visuals}
                        spreadSummary = {lineSummary}
                        gameId = {props.lineDetails.game_id}
                        >
                    </ConjectureDialog>
               </div>

                <div className="game_detail__button">
                    <Button size='small' onClick={manageDetail} variant="contained">Show Details</Button>
               </div>
            </div>
         </div>

    )
}