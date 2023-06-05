import * as React from 'react';
import { useEffect, useMemo, useState } from "react";
import TeamCard from '../TeamCard';
import PlaceConjectureTab from './PlaceConjectureTab'
import MatchUpDetailsTab from './MatchUpDetailsTab'
import TabPanel from './TabPanel'
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

export default function MatchupDialog({visuals, spreadSummary, gameId, gameDetails, startingTab, setSubmitted, openDialog, showDialog}) {

  const [open, setOpen] = React.useState(showDialog);
  const [showOst, setShowOst] = React.useState(true);
  const [showVegas, setShowVegas] = React.useState(true);
  const [showOU, setShowOU] = React.useState(true);
  const [showSpread, setShowSpread] = React.useState(true);
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

  console.log(`open: ${open}`)


  const [tabShown, setTabShown] = React.useState(startingTab);

  const standardSpreads = spreadSummary[0]
  const ouSpreads = spreadSummary[1]
  const overDirections = ["over","Over"]

    const changeTab = (event: React.SyntheticEvent, newTab: string) => {
    setTabShown(newTab);
  };

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

  function tabProps(index: string) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

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


  function handleClose() {
    setOpen(false);
    openDialog(false);
    resetState()
  };

  console.log(`tabShown: ${tabShown}`)

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabShown} onChange={changeTab} aria-label="basic tabs example">
              <Tab label="Place Conjecture" value="conjecture" {...tabProps("conjecture")} />
              <Tab label="Matchup Details" value="detail" {...tabProps("detail")} />
            </Tabs>
          </Box>
          <TabPanel value={tabShown} index={"conjecture"}>
            <PlaceConjectureTab
               visuals={visuals}
               spreadSummary = {spreadSummary}
               gameId = {gameId}
               close = {handleClose}
               setSubmitted = {setSubmitted}
            >
            </PlaceConjectureTab>
          </TabPanel>
          <TabPanel value={tabShown} index={"detail"}>
            <MatchUpDetailsTab
               visuals={visuals}
               spreadSummary = {spreadSummary}
               gameDetails = {gameDetails}
               close= {handleClose}
            >
            </MatchUpDetailsTab>
          </TabPanel>
        </Box>
      </Dialog>
    </div>
  )
}