
import * as React from "react";
import {Navigate} from "react-router-dom";


export default function LogOut() {
  localStorage.setItem("loginName", "")
  localStorage.setItem("authenticated", false)
  localStorage.setItem("loginId", "");
  return (<Navigate to="/login" autoLoad={false} />);
}