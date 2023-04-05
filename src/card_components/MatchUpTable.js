import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//teamDetailRows
//props.DetailRows
function pointsToScore(home_points, away_points) {
    const score = Math.round(home_points).toString() + ' - ' + Math.round(away_points).toString()
    return score
};

function overUnderCalc(home_points, away_points) {
    const overUnder = Math.round(home_points) + Math.round(away_points)
    return overUnder
};



export default function MatchUpTable(props) {
    console.log({props})

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
                stat: "Talet Rating",
                home: (Math.round(props.lineDetails.home_talent_rating * 1000) / 1000),
                away: (Math.round(props.lineDetails.away_talent_rating * 1000) / 1000)
            }
        ]

    return(
        <div>
        <TableContainer component={Paper} sx={{ borderBottom: .5,  borderColor: 'grey.500' }} >
              <Table sx={{ minWidth: 400, maxWidth: 600 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">OSTree Prediction</TableCell>
                    <TableCell align="center">Vegas Predition</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lineSummary.map((row) => (
                    <TableRow
                      key={row.category}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.category}</TableCell>
                      <TableCell align="center">{row.oldst}</TableCell>
                      <TableCell align="center">{row.vegas}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
            {props.showDetail &&
                (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400, maxWidth: 600 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Stat</TableCell>
                    <TableCell align="left">Home</TableCell>
                     <TableCell align="left">Away</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gameDetails.map((row) => (
                    <TableRow
                      key={row.stat}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.stat}</TableCell>
                      <TableCell align="left">{row.home}</TableCell>
                      <TableCell align="left">{row.away}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
                )
            }
        </div>

    )
}