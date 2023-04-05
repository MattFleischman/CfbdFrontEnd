import React from "react";
import {useState} from 'react';

import MatchUpTable from './MatchUpTable';
import Button from '@mui/material/Button';
import TeamCard from './TeamCard';


export default function TeamComparison(props) {

    const [showDetail, setShowDetail] = useState(false);

    const manageDetail = event => {
        setShowDetail(current => !current);
    }
    console.log("home_logo: " + props.gameLines.home_logo)
    return(
        <div className="simple_game__wrapper">
            <div className="sub_card__wrapper">
                <TeamCard img={props.gameLines.home_logo}
                          title={"(H) " + props.gameLines.home}
                />
                <TeamCard img={props.gameLines.away_logo}
                          title={props.gameLines.away}
                />
            </div>
           <div className="simple_game__summary">
             <MatchUpTable
                 lineDetails = {props.gameLines}
                 showDetail = {showDetail}
             />
            </div>
            <div className="comparison_button_container">

                <div className="place_conjecture__button">
                    <Button variant="contained">Place Conjecture</Button>
               </div>

                <div className="game_detail__button">
                    <Button onClick={manageDetail} variant="contained">Show Details</Button>
               </div>

            </div>
         </div>

    )
}