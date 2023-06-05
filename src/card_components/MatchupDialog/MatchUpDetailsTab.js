import * as React from 'react';
import { useEffect, useMemo, useState } from "react";
import MatchUpTable from '../MatchUpTable';
import TeamCard from '../TeamCard';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Fade from '@mui/material/Fade';
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";


export default function MatchUpDetailsTab({ gameDetails, visuals, close}) {

return(
    <div>
            <DialogTitle>
              Matchup Details
            </DialogTitle>
            <DialogContent>
              <Box sx={{ minWidth: 400, maxWidth: 600, maxHeight: 400, margin: 2}}>
                <Grid container
                      spacing={1}
                      direction="row"
                      style={{
                        justifyContent: 'center',
                        marginBottom: 20,
                        marginTop: 10}}
                        >
                    <Grid item xs={4} >
                        <TeamCard img={visuals.home_logo}
                                  title={"(H) " + visuals.home_title}
                                  cardMaxWidth={100}
                                  mediaMaxHeight={100}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TeamCard img={visuals.away_logo}
                                  title={visuals.away_title}
                                  cardMaxWidth={100}
                                  mediaMaxHeight={100}
                        />
                    </Grid>
                </Grid>
              </Box>
                    <MatchUpTable
                         gameDetails = {gameDetails}
                         showLines = {false}
                         showDetail = {true}
                     />
              </DialogContent>
           <DialogActions>
                <Button onClick={() => close()}>Close</Button>
        </DialogActions>
    </div>
)


}