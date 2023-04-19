import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Navigate } from "react-router-dom";
//import { Card, Image } from 'react-bootstrap';
import '../App.css';
import App from "../App.js";
import { styled } from "@mui/material/styles";


export default function LoginBase() {

  const [authenticated, setAuthenticated] = useState(
  localStorage.getItem(localStorage.getItem("authenticated")|| false)
  ); //switch from local storage to react context

  const responseFacebook = (response) => {
    console.log(`auth response: ${response}`);
    localStorage.setItem("loginData", response);
    localStorage.setItem("loginName", response.name)
    localStorage.setItem("userImage", response.picture.data.url);


    if (response.accessToken) {
        localStorage.setItem("authenticated", true);
      setAuthenticated(true);

    } else {
        localStorage.setItem("authenticated", false);
      setAuthenticated(false);

    }
  }

    const CardContentSoftPadding = styled(CardContent)(`
      padding: 1px;
      &:last-child {
        padding-bottom: 1px;
      }
    `);

    console.log(`authenticated: ${authenticated}`)

  if (authenticated) {
        return <Navigate replace to="/" />;
    }
  else {
          return (
          <div>
            <div class="login_container">
             <h3> Welcome! Please sign in for some chicanery in the trenches. </h3>
             </div>
             <Box display="flex"
                    justifyContent="center"
                    sx={{margin: 10}}
                    >
                 <Card >
                      <CardContentSoftPadding sx={{}}>
                       <Typography
                           align="center"
                           variant="h7"
                           component="div"
                           >
                         {!authenticated &&
                            <FacebookLogin
                              appId="1443221209841704"
                              autoLoad={true}
                              fields="name,email,picture"
                              scope="public_profile,user_friends"
                              callback={responseFacebook}
                              icon="fa-facebook" />
                          }
                        </Typography>
                      </CardContentSoftPadding>
                </Card>
               </Box>

          </div>
                      );
    }
};