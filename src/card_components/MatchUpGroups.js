import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import TeamComparison from './TeamComparison';



export default function MatchUpGroups(props) {
    const [gameLines, setGameLines] = useState([]);
        const fetchGameLines = async (week) => {
            console.log(`fetching game prediction results for week: ${week}`)
            const response = await axios
                .get(`https://f8f9t7ilzf.execute-api.us-east-1.amazonaws.com/Prod/prediction_output?week=${week}`)
                .catch((err) => console.log(err));
            if (response) {
                const gameLines = response.data;

                console.log("GameLines: ", gameLines);
                setGameLines(gameLines);
            }
        };

        useEffect(() => {
            fetchGameLines(props.week);
        }, [props.week]);

  console.log("GameLine week: " + props.week)


    return(

        <div className="outer_card__wrapper">
            {gameLines.map((line) => (
                      <TeamComparison
                gameLines = {line}
            />))}

        </div>
    )
}