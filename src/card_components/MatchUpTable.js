import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function MatchUpTable(props) {
    const [showLines, setShowLines] = React.useState(props.showLines)
    const [showDetails, setShowDetails] = React.useState(props.showDetails)
    const [lineSummary, setLineSummary] = React.useState(props.lineSummary)
    const [gameDetails, setGameDetails] = React.useState(props.gameDetails)


    return(
        <div>
        {props.showLines &&
                (
        <TableContainer component={Paper} sx={{ justifyContent: 'center', minWidth: "auto", maxWidth: "auto" , borderBottom: .5,  borderColor: 'grey.500' }} >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">OSTree Prediction</TableCell>
                    <TableCell align="center">Vegas Predition</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.lineSummary.map((row) => (
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
                )
              }
            {props.showDetail &&
                (
            <TableContainer component={Paper} sx={{ minWidth: "auto", maxWidth: "auto" , borderBottom: .5,  borderColor: 'grey.500' }}>
            <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Stat</TableCell>
                    <TableCell align="left">Home</TableCell>
                     <TableCell align="left">Away</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.gameDetails.map((row) => (
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