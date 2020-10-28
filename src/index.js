import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './Resources/css/app.css';
import Routes from './Routes';
import { firebase } from './firebase';


/**
 * 
 * @param {*} props pass all the logged in user props to the Routes. 
 */

const App = (props) =>{
  return(
    <BrowserRouter>
      <Routes {...props}/>
    </BrowserRouter>
  )
}

/**
 * @params firebase  provides us a way to authenticate user
 * @method firebase.auth().onAuthStateChanged() checks user weather authenticated
 * @auth if authenticated then render the app component all the props of user
 */

 firebase.auth().onAuthStateChanged((user) =>{

   ReactDOM.render(<App user={user}/>,document.getElementById('root'));
 })

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

