import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppHeader from '../AppHeader';

function createData(item, description) {
  return { item, description };
}

const rows = [
  createData('Pred Score', 'The predicted score of a given matchup and/or point spread differential.'),
  createData('Over/Under', 'The predicted total points scored in a given matchup.'),
  createData('ELO', 'The team strength metric based on the tendancy of a team to either beat of lose to strong and week teams.'),
  createData('Talent Rating', 'A cumulative value assigned to each team based on the average recruit/transfer in rating of the players on the roster that have played a snap in the current season.'),
  createData('Conjecture', 'A user submitted points weighted guess on an outcome of a matchup.'),
];

export default function DataLexicon() {
  return (
    <div>
        <AppHeader
                        userImage={localStorage.getItem("userImage")}
                        userName={localStorage.getItem("loginName")}
                        currentNav='/lexicon' /*Look for a non hard coded way of defining current page*/
                        >
        </AppHeader>
        <header className="App-header">
                <h1> Data Lexicon </h1>
        </header>
        <div className="lexicon-table">
        <TableContainer component={Paper} sx={{ minWidth: 650, maxWidth: 1200 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{fontWeight: "bold"}}>Data Item</TableCell>
                <TableCell align="left" style={{fontWeight: "bold"}}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.item}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.item}
                  </TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
    </div>
  );
}