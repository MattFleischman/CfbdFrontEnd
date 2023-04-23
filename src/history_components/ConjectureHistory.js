import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import ConjectureHistoryTable from './ConjectureHistoryTable'
import AppHeader from '../AppHeader';


export default function ConjectureHistory() {
  const [fetchCompleted, setFetchCompleted] = React.useState(false)
  const [conjectureHistory, setConjectureHistory] = React.useState([])

function createData(id, timestamp, amount, gameId, matchUp, source, type, baseline, direction, outcome) {
  return {
    id,
    timestamp,
    amount,
    gameId,
    matchUp,
    source,
    type,
    baseline,
    direction,
    outcome
  };
}

const fetchConjectureHistory = async (userId) => {
    console.log(`fetching Conjecture history for user: ${userId}`)
    const response = await axios
        .get(`https://u0dppkg69j.execute-api.us-east-1.amazonaws.com/prod/{userId}`)
        .catch((err) => console.log(err));
    if (response) {
        const conjectureHistory = response.data;

        console.log("conjectureHistory: ", conjectureHistory);
        console.log("conjectureHistory type: ", typeof conjectureHistory);
        let temp_rows = []
        for (let i = 0; i < conjectureHistory.length; i++) {
           let conj = conjectureHistory[i]
           console.log(`conj: ${JSON.stringify(conj)}`)
        temp_rows.push(createData(conj.conjecture_id, conj.conjecture_timestamp, conj.conjecture_amount,
                    conj.game_id, conj.match_up, conj.baseline_source, conj.conjecture_type,
                    conj.conjecture_baseline, conj.conjecture_direction, conj.conjecture_status))
        }
        console.log(`temp_rows: ${temp_rows}`)
        setConjectureHistory(temp_rows)
        setFetchCompleted(true);
                }
    };

      useEffect(() => {
            let userId = localStorage.getItem("loginId").toString()
            fetchConjectureHistory(userId);
        }, []);


    console.log(`conjectureHistory: ${conjectureHistory}`)

  return (
  <div>
    <AppHeader
                    userImage={localStorage.getItem("userImage")}
                    userName={localStorage.getItem("loginName")}
                    currentNav='/history' /*Look for a non hard coded way of defining current page*/
                    >
    </AppHeader>
    <header className="App-header">
                <h1> Conjecture History </h1>
        </header>
    <ConjectureHistoryTable
        conjectureHistory = {conjectureHistory}
    >
    </ConjectureHistoryTable>
  </div>
  );
}