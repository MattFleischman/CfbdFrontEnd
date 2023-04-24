import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';
import DeleteIcon from '@mui/icons-material/Delete';
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
import {useState, useEffect} from "react";
import axios from "axios";
import LogOut from "./LogOut";
import {Navigate} from "react-router-dom";


export default function ProfileSetting(props) {
  const [open, setOpen] = React.useState(true);
  const [requestSubmitted, setRequestSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [settingDisplay, setSettingDisplay] = React.useState(null);
  const [selectedDisplay, setSelectedDisplay] = React.useState(false);
  const [matchUpGrouping, setMatchUpGrouping] = React.useState(localStorage.getItem("matchupDisplay") || "conference");
  const [userEmail, setUserEmail] = React.useState(null);

  useEffect( () => {
   setOpen(props.openDisp)
   console.log(`updated open settings`)
  }, [props])

  const resetState = () => {
    setSubmitError(false);
    setErrorMessage(null);
    setSettingDisplay(null);
    setSelectedDisplay(null);
    setMatchUpGrouping(localStorage.getItem("matchupDisplay") || "conference");


  }
  console.log(`requestSubmitted: ${requestSubmitted}`)

  const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

  const handleClose = () => {
    setOpen(false);
    resetState()
  };

  const handleEmail = (event) => {
  setUserEmail(event.target.value)
  }

  const handleGroupingSelect = (event) => {
  setMatchUpGrouping(event.target.value);
  };


  const postSettingUpdate = async (request) => {
            console.log(`posting setting update for ${request.resource}`)
            console.log(`payload: ${JSON.stringify(request.body)}`)

             const response = await axios
                .patch(`https://0s2wopde2k.execute-api.us-east-1.amazonaws.com/prod/profilesettings/${request.resource}`,
                    request.body
                )
                .catch((err) => console.log(err));
            if (response) {
                const settingUpdateResponse = response.data;

                console.log("settingUpdateResponse: ", settingUpdateResponse);
            }
        };


  const handleSubmit = () => {
    if (!emailRequestValidate(userEmail)) {
        postSettingUpdate({resource: 'email',
                        body: {
                            userId: localStorage.getItem("loginId"),
                            email: userEmail}
                            });
        }
     if (matchUpGrouping != localStorage.getItem("matchupDisplay")) {
        postSettingUpdate({resource: 'matchupdisplaypreference',
                        body: {
                            userId: localStorage.getItem("loginId"),
                            matchUpDisplayPreference : matchUpGrouping
                        }
                        });
        localStorage.setItem("matchupDisplay", matchUpGrouping)
        }
        setRequestSubmitted(true);
        console.log(`request submitted`)
        resetState();

  };

  const emailRequestValidate = (email) => {
      console.log(`validate email: ${email}`)
      if (!email) {
      console.log(`no email submitted`)
      return true}
      else if (validateEmail(email)) {
        console.log(`passed email validation`)
        return false
        }
      else {
        console.log(`failed email validation`)
        setSubmitError(true)
        setErrorMessage("Email input has to be a valid email form")
        return true
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Profile Settings
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="h7" align="center">
                            Review and update your account settings
                        </Typography>
                    </DialogContentText>
                    <Box sx={{marginTop: 2, minWidth: 400}}>
                        <Box textAlign="center" sx={{
                                  border: '1px solid grey',
                                  marginBottom: 2,
                                  }}>
                            <Box sx={{marginTop: 1}}>
                                <Typography variant="h7" align="center" sx={{fontStyle: "italic"}}>
                                   Display
                                </Typography>
                            </Box>
                            <Box textAlign="left" sx={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      maxWidth: 1000,
                                      padding: .5}}>

                                    <FormControl fullWidth>
                                        <Typography sx={{paddingTop: 2}}>
                                            MatchUp Grouping:
                                        </Typography>
                                    </FormControl>
                                        <FormControl sx={{width: '60%'}}>
                                          <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={matchUpGrouping}
                                            label="Grouping"
                                            onChange={handleGroupingSelect}
                                          >
                                            <MenuItem value={"conference"}>Conference</MenuItem>
                                            <MenuItem value={"ouMargin"}>O/U Margin</MenuItem>
                                          </Select>
                                        </FormControl>

                            </Box>
                        </Box>
                        <Box textAlign="center" sx={{
                                  border: '1px solid grey',
                                  marginBottom: 2
                                  }}>
                            <Box sx={{marginTop: 1}}>
                                <Typography variant="h7" sx={{fontStyle: "italic"}}>
                                   User Details
                                </Typography>
                            </Box>
                        <Box textAlign="left" sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            maxWidth: 400,
                            padding: .5
                        }}>
                            <Typography sx={{paddingTop: 2}}>
                            Update Email Address:
                            </Typography>
                            <TextField
                                   id="standard-basic"
                                   variant="standard"
                                   label="email"
                                   defaultValue={userEmail}
                                   onChange={handleEmail}
                                   />
                        </Box>

                    </Box>
                        {submitError &&
                            <Alert onClose={() => {setSubmitError(false)}} severity="error">
                              <AlertTitle>Error</AlertTitle>
                                {errorMessage}
                                </Alert>
                        }
                    </Box>
                 <Snackbar open={requestSubmitted}
                          autoHideDuration={3000}
                          onClose={() => {setRequestSubmitted(false)}}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={() => {
                        setRequestSubmitted(false)
                    }} severity="success" sx={{width: '100%'}}>
                    <AlertTitle>Settings Updated!</AlertTitle>
                        Refresh your browser to reflect changes
                    </Alert>
            </Snackbar>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Update Settings</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}