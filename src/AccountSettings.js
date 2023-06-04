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
import {useState} from "react";
import axios from "axios";
import LogOut from "./LogOut";
import {Navigate} from "react-router-dom";


export default function AccountSettings(props) {
  const [open, setOpen] = React.useState(true);
  const [requestSubmitted, setRequestSubmitted] = React.useState(false)
  const [source, setSource] = React.useState(null);
  const [conjectureType, setConjectureType] = React.useState(null);
  const [fundingAmount, setFundingAmount] = React.useState(0);
  const [conjectureDirection, setConjectureDirection] = React.useState(null);
  const [submitError, setSubmitError] = React.useState(false);
  const [fundingRequested, setFundingRequested] = React.useState(false);
  const [requestedAmount, setRequestedAmount] = React.useState(null);
  const [fundingRequestResponse, setFundingRequestResponse] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [deleteSubmitted, setDeleteSubmitted] = React.useState(false);
  const [deleteInitiated, setDeleteInitiated] = React.useState(false);
  const [settingDisplay, setSettingDisplay] = React.useState(null);
  const [selectedDisplay, setSelectedDisplay] = React.useState(false);
  const [fundingMessage, setFundingMessage] = React.useState(false);
  const [tokenAmount, setTokenAmount] = React.useState(localStorage.getItem("tokenAmount"))

  React.useEffect( () => {
   setOpen(props.openDisp)
   console.log(`updated open settings`)
  }, [props])

  console.log(`open Account Settings: ${open}`)



  const resetState = () => {
    setSubmitError(false);
    setConjectureDirection(null);
    setFundingAmount(0);
    setConjectureType("");
    setSource("");
  }

  const handleClose = () => {
    setOpen(false);
    resetState()
  };

  const postDeleteRequest = async (request) => {
            console.log(`posting delete request: ${request}`)

           /* const response = await axios
                .post("https://u0dppkg69j.execute-api.us-east-1.amazonaws.com/prod/",
                    request
                )
                .catch((err) => console.log(err));
            if (response) {
                const deleteResponse = response.data;

                console.log("deleteResponse: ", deleteResponse);
                setDeleteRequestResponse(deleteResponse);
            }*/
        };
  const handleDeleteDetails = () => {
      const now = new Date().toISOString()
      console.log(`timestamp: ${now}`)
      //setOpen(false);
      postDeleteRequest({
            user_id: localStorage.getItem("loginId"),
            conjecture_timestamp: now
            });
      setDeleteSubmitted(true);
      localStorage.setItem("loginId", "")
      localStorage.setItem("loginName", "")
      localStorage.setItem("userImage", "")

  };

  const completeDelete = () => {
      resetState();
      setRequestSubmitted(false);
      setSettingDisplay(<LogOut></LogOut>)
      setSelectedDisplay(true)
  }

  const initiateDeleteDetails = () => {
      setDeleteInitiated(true);
  };


  const postFundingRequest = async (request) => {
            console.log(`posting funding request: ${JSON.stringify(request)}`)
            console.log(`start funding approval request`)

            const response = await axios
                .post(`https://j73p7rq7u8.execute-api.us-east-1.amazonaws.com/prod/fundingrequest`,
                    request
                )
                .catch((err) => console.log(`error: ${err}`));

            if (response) {
                const fundingResponse = response.data;

                console.log("fundingResponse: ", fundingResponse);
                setFundingRequestResponse(fundingResponse);
            }
            else {
            console.log("no response")
            }
           console.log(`end funding approval request`)
        };

  function genRandomString(length) {
   var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
   var charLength = chars.length;
   var result = '';
   for ( var i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
   }
   return result;
    }

  const handleFundingRequest = (amount) => {
                  setRequestedAmount(amount);
                  const now = new Date().toISOString()
                  console.log(`timestamp: ${now}`);
                  const request = genRandomString(12);
                  console.log(`requestId: ${request}`)
                  setFundingRequested(false);
                  postFundingRequest(
                         {
                             requestId: {
                                S: request
                              },
                             timestamp: {
                                S: now
                              },
                              userId: {
                                S: localStorage.getItem("loginId")
                              },
                              amount: {
                                N: fundingAmount
                              },
                              message: {
                                S: fundingMessage
                              }
                          }
                          );
                  setRequestSubmitted(true);
                  resetState();
  };

  const initiateFundingRequest = () => {
      console.log(`initiate amount: ${fundingAmount}`)
      if (!fundingRequestValidate(fundingAmount)) {
        setFundingRequested(true);
        }
      else {
        return
    }
  };


  const handleFundingAmount = (event) => {
    setFundingAmount(event.target.value);
  };

  const updateFundingMessage = (event) => {
    setFundingMessage(event.target.value);
  };

  const fundingRequestValidate = (amount) => {
      console.log(`validate amount: ${amount}`)
      if (amount == "0") {
        setSubmitError(true)
        setErrorMessage("Funding amount has to be greater than 0")
        return true
        }
        return false
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle sx={{textAlign: 'center'}}>
                    Account Settings
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="h7" align="center">
                            Review and update your account settings
                        </Typography>
                    </DialogContentText>
                    <Box sx={{marginTop: 2}}>
                        <Box textAlign="center" sx={{
                                  border: '1px solid grey',
                                  marginBottom: 2
                                  }}>
                            <Typography variant="h7" align="center" sx={{fontStyle: "italic"}}>
                               Privacy
                            </Typography>
                            <Box textAlign="left" sx={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      maxWidth: 1000,
                                      padding: .5}}>

                                    <FormControl fullWidth>
                                        <Typography sx={{paddingTop: .5}}>
                                            Delete User Data:
                                        </Typography>
                                    </FormControl>
                                        <Button variant="text" onClick={initiateDeleteDetails}>
                                            Delete
                                        </Button>

                            </Box>
                            <Backdrop
                            sx={{ color: '#fff',
                                zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={deleteInitiated}>
                                  <Alert
                                      onClose={() => {setDeleteInitiated(false)}} severity="warning"
                                      sx={{ width: '40%', justifyContent: 'center' }}>
                                    <AlertTitle  sx={{  textAlign: 'center', fontWeight: 'bold' }}>Please Confirm</AlertTitle>
                                      <Typography>Performing this operation will delete
                                          your user profile and lose your conjecture tokens.</Typography>
                                    <Button variant="outlined"
                                            textAlign="right"
                                            onClick={handleDeleteDetails}
                                            sx={{maxWidth: 200, marginTop: 1, color: 'red', borderColor: 'red'}}>
                                            Delete Details
                                    </Button>
                                  </Alert>
                               </Backdrop>
                            <Snackbar open={deleteSubmitted}
                              autoHideDuration={6000}
                              anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}
                              onClose={() => {setRequestSubmitted(false)}}>
                              <Alert
                                  onClose={() => {completeDelete(false)}}
                                  severity="info"
                                          >
                                        <AlertTitle  sx={{ textAlign: 'center' }}>Delete Request Sent</AlertTitle>
                                        <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>Logging Out</Typography>
                              </Alert>
                            </Snackbar>
                        </Box>
                        <Box textAlign="center" sx={{
                                  border: '1px solid grey',
                                  marginBottom: 2
                                  }}>
                            <Typography variant="h7" sx={{fontStyle: "italic"}}>
                               Wallet
                            </Typography>
                        <Box textAlign="left" sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            maxWidth: 400,
                            padding: .5
                        }}>
                            <Typography sx={{paddingTop: 3}}>Token Amount:</Typography>
                            <Typography sx={{paddingTop: 3, paddingRight: 4, fontWeight: 800}}>{tokenAmount}</Typography>
                        </Box>
                        <Box textAlign="left" sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            maxWidth: 400,
                            padding: .5
                        }}>
                            <Typography sx={{paddingTop: 3}}>Request Tokens:</Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                inputProps={{min: 0, style: {width: 100, textAlign: 'center'}}}
                                label="Tokens"
                                type="number"
                                variant="standard"
                                defaultValue="0"
                                onChange={handleFundingAmount}
                            />
                        </Box>
                            <Box textAlign="right">
                                        <Button variant="text"
                                                onClick={initiateFundingRequest}
                                                sx={{maxWidth: 100}}>
                                            Request
                                        </Button>
                            </Box>
                    </Box>
                        {submitError &&
                            <Alert onClose={() => {setSubmitError(false)}} severity="error">
                              <AlertTitle>Error</AlertTitle>
                                {errorMessage}
                                </Alert>
                        }
                    </Box>
                    <Backdrop
                            sx={{ color: '#fff',
                                zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={fundingRequested}>
                      <Alert
                          onClose={() => {setFundingRequested(false)}} severity="info"
                          sx={{ width: '40%', justifyContent: 'center' }}>
                        <AlertTitle  sx={{  textAlign: 'center' }}>Beg for the Guilder</AlertTitle>
                        <TextField sx={{width: 400}}
                                   id="standard-basic"
                                   variant="standard"
                                   multiline
                                   maxRows={4}
                                   onChange={updateFundingMessage}/>
                        <Box textAlign="right">
                        <Button variant="text"
                                textAlign="right"
                                onClick={handleFundingRequest}
                                sx={{maxWidth: 100}}>
                                Submit
                        </Button>
                       </Box>
                      </Alert>
                   </Backdrop>
                    <Snackbar open={requestSubmitted}
                              autoHideDuration={3000}
                              anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}
                              onClose={() => {setRequestSubmitted(false)}}>
                      <Alert
                          onClose={() => {setRequestSubmitted(false)}}
                          severity="info"
                                  >
                                <AlertTitle  sx={{ textAlign: 'center' }}>Funding Request Submitted</AlertTitle>
                                <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>Pending Review</Typography>
                      </Alert>
                    </Snackbar>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
                {selectedDisplay &&
                    [settingDisplay]
                }
            </Dialog>

        </div>
    )
}