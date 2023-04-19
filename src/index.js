import React from "react";
import {StrictMode } from "react";
import ReactDOM from "react-dom"
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginBase from "./login/LoginBase";
import ConjectureHistory from "./history_components/ConjectureHistory";
import DataLexicon from "./lexicon_components/DataLexicon";
import ContactUs from "./contact_components/ContactUs";
import MatchUpDisplay from "./matchup_components/MatchUpDisplay";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={ <App/> } />
        <Route path="matchUp" element={ <MatchUpDisplay/> } />
        <Route path="login" element={ <LoginBase/> } />
        <Route path="history" element={ <ConjectureHistory/> } />
        <Route path="lexicon" element={ <DataLexicon/> } />
        <Route path="contact" element={ <ContactUs/> } />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
