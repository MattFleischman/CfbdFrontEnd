import * as React from 'react';
import AppHeader from '../AppHeader';

export default function ContactUs() {
  return (
    <div>
        <AppHeader
                        userImage={localStorage.getItem("userImage")}
                        userName={localStorage.getItem("loginName")}
                        currentNav='/contact' /*Look for a non hard coded way of defining current page*/
                        >
        </AppHeader>
        <header className="App-header">
                <h1> Contact Us </h1>
                <p>email at: mattfleischman64@gmail.com</p>
        </header>
    </div>
  );
}