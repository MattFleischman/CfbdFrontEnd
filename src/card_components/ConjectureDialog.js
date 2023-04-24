import * as React from 'react';
import { useEffect, useMemo, useState } from "react";
import TeamCard from './TeamCard';
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

export default function ConjectureDialog(props) {

  const [open, setOpen] = React.useState(false);
  const [showOst, setShowOst] = React.useState(true);
  const [showVegas, setShowVegas] = React.useState(true);
  const [showOU, setShowOU] = React.useState(true);
  const [showSpread, setShowSpread] = React.useState(true);
  const [requestSubmitted, setRequestSubmitted] = React.useState(false)
  const [source, setSource] = React.useState(null);
  const [conjectureType, setConjectureType] = React.useState(null);
  const [conjecture, setConjecture] = React.useState(0);
  const [conjectureDirection, setConjectureDirection] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(false);
  const [placeConjectorResponse, setPlaceConjectorResponse] = useState({});
  const [isShowingAlert, setShowingAlert] = React.useState(false);
  const [coverDirections, setCoverDirections] = React.useState(null);
  const [beatDirections, setBeatDirections] = React.useState(null);

  const standardSpreads = props.spreadSummary[0]
  const ouSpreads = props.spreadSummary[1]
  const overDirections = ["over","Over"]
/*
  console.log(`showOst: ${showOst}`)
  console.log(`showVegas: ${showVegas}`)
  console.log(`showOU: ${showOU}`)
  console.log(`showSpread: ${showSpread}`)
  console.log(`standardSpreads: ${standardSpreads}`)
  console.log(`ouSpreads: ${ouSpreads}`)
  console.log(`requestSubmitted: ${requestSubmitted}`)*/

  const handleSourceChange = (event) => {
    setSource(event.target.value);
    if (event.target.value == "OSTree") {
        setShowOst(true)
        setShowVegas(false)
    } else {
        setShowOst(false)
        setShowVegas(true)
    }
  };

  const handleConjectureTypeChange = (event) => {
    setConjectureType(event.target.value);
    if (event.target.value == "Spread") {
        setShowSpread(true)
        setShowOU(false)
        setCoverDirections(["cover","Cover"])
        setBeatDirections(["beat","Beat"])
    } else {
        setShowSpread(false)
        setShowOU(true)
        setCoverDirections(["over","Over"])
        setBeatDirections(["under","Under"])
    }
  };

  const resetState = () => {
    setShowSpread(true);
    setShowOU(true);
    setShowOst(true);
    setShowVegas(true);
    setSubmitError(false);
    setCoverDirections(null);
    setBeatDirections(null);
    setConjectureDirection(null);
    setConjecture(0);
    setConjectureType("");
    setSource("");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetState()
  };

  const handleConjecture = (event) => {
    setConjecture(event.target.value);
  };

  const handleConjectureDirection = (event) => {
    setConjectureDirection(event.target.value);
  };

  const submitValidate = () => {
       /*console.log(`conjectureType: ${conjectureType}`)
       console.log(`source: ${source}`)
       console.log(`conjecture: ${conjecture}`)
       console.log(`conjectureDirection: ${conjectureDirection}`)*/
      if ((conjectureType == "") || (source == "") || (conjectureDirection === null)) {
          setSubmitError(true)
          setErrorMessage("Spread type, Source, and Conjecture Direction need to be selected to submit. ")
          return true
          }
      else if (conjecture == "0") {
        setSubmitError(true)
        setErrorMessage("conjecture amount has to be greater than 0")
        return true
        }
        return false
    }

    const predictionBaseLineEval = (source, type) => {
    if (type == "Spread") {
        if (source == "OSTree" ) {
            return standardSpreads.oldst
            }
        else {
            return standardSpreads.vegas
        }
    }
    else {
        if (source == "OSTree" ) {
            return ouSpreads.oldst
            }
        else {
            return ouSpreads.vegas
        }
    }
    }

        const postConjecture = async (request) => {
            console.log(`posting conjector: ${request}`)

            const response = await axios
                .post("https://u0dppkg69j.execute-api.us-east-1.amazonaws.com/prod/placedconjectures",
                    request
                )
                .catch((err) => console.log(err));
            if (response) {
                const conjectureResponse = response.data;

                console.log("conjectureResponse: ", conjectureResponse);
                setPlaceConjectorResponse(conjectureResponse);
            }
        };

  const handleSubmit = () => {
    if (!submitValidate()) {
        console.log(`submitError: ${submitError}`)
        const now = new Date().toISOString()
        console.log(`timestamp: ${now}`)
        let predictionBaseline = predictionBaseLineEval(source, conjectureType)
        console.log(`predictionBaseline: ${predictionBaseline}`)
        setOpen(false);
        postConjecture(
                    {
                    user_id: localStorage.getItem("loginId").toString(),
                    conjecture_timestamp: now,
                    conjecture_amount: conjecture,
                    game_id: props.gameId,
                    match_up: `(H) ${props.visuals.home_title} vs ${props.visuals.away_title}`,
                    baseline_source: source,
                    conjecture_type: conjectureType,
                    conjecture_baseline : predictionBaseline,
                    conjecture_direction: conjectureDirection,
                    conjecture_status: "Pending"
                    }
                    )
        setRequestSubmitted(true);
        setShowingAlert(true);
        resetState();
    //add in backend integration API
    }
    else {
        return
    }
  };

  return (
    <div>
      <Button size='small' variant="outlined" onClick={handleClickOpen}>
        {props.buttonLabel}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        >
        <DialogTitle>
            Create Conjecture
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h7" align="center">
            Select the spread source and type to place a conjecture on
            </Typography>
          </DialogContentText>
              <Box sx={{ maxWidth: 600, maxHeight: 400, margin: 2}}>
              <Grid container
                      spacing={1}
                      direction="row"
                      style={{
                        justifyContent: 'space-around',
                        marginBottom: 20,
                        marginTop: 10}}
                        >
                <Grid item xs={4} >
                <TeamCard img={props.visuals.home_logo}
                          title={"(H) " + props.visuals.home_title}
                          cardMaxWidth={100}
                          mediaMaxHeight={100}
                />
                </Grid>
                <Grid item xs={4}>
                <TeamCard img={props.visuals.away_logo}
                          title={props.visuals.away_title}
                          cardMaxWidth={100}
                          mediaMaxHeight={100}
                />
                 </Grid>
              </Grid>
              <Grid
                    style={{ display: "flex", gap: "2rem"}}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">source</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={source}
                      label="Source"
                      onChange={handleSourceChange}
                    >
                      <MenuItem value="Vegas">Vegas</MenuItem>
                      <MenuItem value="OSTree">OSTree</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Spread Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={conjectureType}
                      label="Conjecture Type"
                      onChange={handleConjectureTypeChange}
                    >
                      <MenuItem value="Spread">Spread</MenuItem>
                      <MenuItem value="Over/Under">Over/Under</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
            </Box>
            <TableContainer component={Paper} sx={{ borderBottom: .5, borderTop: .5,  borderColor: '#62ABB1' }} >
              <Table align="center" sx={{ minWidth: 100, maxWidth: 300 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {showOst && <TableCell align="center">OSTree Prediction</TableCell>}
                    {showVegas && <TableCell align="center">Vegas Predition</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                {showSpread && <TableRow
                      key={standardSpreads.category}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{standardSpreads.category}</TableCell>
                      {showOst && <TableCell align="center">{standardSpreads.oldst}</TableCell>}
                      {showVegas && <TableCell align="center">{standardSpreads.vegas}</TableCell>}
                    </TableRow>}
                {showOU && <TableRow
                      key={ouSpreads.category}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{ouSpreads.category}</TableCell>
                      {showOst && <TableCell align="center">{ouSpreads.oldst}</TableCell>}
                      {showVegas && <TableCell align="center">{ouSpreads.vegas}</TableCell>}
                    </TableRow>}
                </TableBody>
              </Table>
              </TableContainer>
           <Box textAlign="center" sx={{display: 'flex',
                                       flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        maxWidth: 400,
                                        margin: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                inputProps={{min: 0, style: { width: 150, textAlign: 'center' }}}
                label="Conjecture Amount"
                type="number"
                variant="standard"
                defaultValue="0"
                onChange={handleConjecture}
              />
              {((beatDirections != null) && (coverDirections != null)) &&
              <RadioGroup
                aria-labelledby="conjecture-direction-group-label"
                name="conjecture-direction-group"
                onChange={handleConjectureDirection}
              >
                <FormControlLabel value={coverDirections[0]} control={<Radio />} label={coverDirections[1]} />
                <FormControlLabel value={beatDirections[0]} control={<Radio />} label={beatDirections[1]} />
              </RadioGroup>
              }
          </Box>
          {submitError &&
                <Alert onClose={() => {setSubmitError(false)}} severity="error">
                  <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                    </Alert>
           }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Place Conjecture</Button>
        </DialogActions>
      </Dialog>
        <Snackbar open={requestSubmitted} autoHideDuration={3000} onClose={() => {setRequestSubmitted(false)}}>
                  <Alert onClose={() => {setRequestSubmitted(false)}} severity="success" sx={{ width: '100%' }}>
                    Your conjecture has been submitted!
                  </Alert>
        </Snackbar>
    </div>
  )
}