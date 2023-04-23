import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TeamCard from "./card_components/TeamCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import {useState} from "react";
import axios from "axios";


export default function ProfileSetting(props) {
  const [open, setOpen] = React.useState(true);
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

  const overDirections = ["over","Over"]
/*
  console.log(`showOst: ${showOst}`)
  console.log(`showVegas: ${showVegas}`)
  console.log(`showOU: ${showOU}`)
  console.log(`showSpread: ${showSpread}`)
  console.log(`standardSpreads: ${standardSpreads}`)
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
        setOpen(false);
        postConjecture(
                    {
                    user_id: "ostree",
                    conjecture_timestamp: now,
                    game_id: props.gameId,
                    conjecture_direction: conjectureDirection,
                    conjecture_amount: conjecture,
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
                    <Box sx={{maxWidth: 600, maxHeight: 400, margin: 2}}>
                        <Grid container
                              spacing={1}
                              direction="row"
                              style={{
                                  justifyContent: 'space-around',
                                  marginBottom: 20,
                                  marginTop: 10
                              }}
                        >
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                        </Grid>
                        <Grid
                            style={{display: "flex", gap: "2rem"}}
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
                    <Box textAlign="center" sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        maxWidth: 400,
                        margin: 2
                    }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            inputProps={{min: 0, style: {width: 150, textAlign: 'center'}}}
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
                                <FormControlLabel value={coverDirections[0]} control={<Radio/>}
                                                  label={coverDirections[1]}/>
                                <FormControlLabel value={beatDirections[0]} control={<Radio/>}
                                                  label={beatDirections[1]}/>
                            </RadioGroup>
                        }
                    </Box>
                    {submitError &&
                        <Alert onClose={() => {
                            setSubmitError(false)
                        }} severity="error">
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
            <Snackbar open={requestSubmitted} autoHideDuration={3000} onClose={() => {
                setRequestSubmitted(false)
            }}>
                <Alert onClose={() => {
                    setRequestSubmitted(false)
                }} severity="success" sx={{width: '100%'}}>
                    Your conjecture has been submitted!
                </Alert>
            </Snackbar>
        </div>
    )
}