import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
import Register from './Views/Register';
import Reset from './Views/Reset';
import Dashboard from './Views/Dashboard';
import Unwinds from './Views/Unwinds';

import Header from './Components/Header';
import Footer from './Components/Footer';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Services/firebase';
import { useDispatch } from 'react-redux';
import { findProfile } from './Services/firestore';
import { loginProfile } from './reducers/profile';
import { addNewFavoArray } from './reducers/favoRelaxMethods';
import React, { useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';

import { messaging } from './Services/firebaseConnection';
import { onMessage } from 'firebase/messaging';

function App() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    // if (!user) return navigate('/');
    fetchProfile();
  }, [user]); //eslint-disable-line

  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const profileFound = await findProfile(user);
      dispatch(loginProfile(profileFound));
      dispatch(addNewFavoArray(profileFound.relaxMethods));
    } catch (err) {
      console.error(err);
    }
  };

  // function requestPermission() {
  //   console.log('Requesting permission...');
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === 'granted') {
  //       console.log('Notification permission granted.');
  //     } else {
  //       console.log('Unable to get permission to notify.');
  //     }
  //   });
  // }

  // const getToken = async (setTokenFound) => {
  //   let currentToken = "";

  //   try {
  //     currentToken = await messaging.getToken({ vapidKey: publicKey });
  //     if (currentToken) {
  //       setTokenFound(true);
  //     } else {
  //       setTokenFound(false);
  //     }
  //   } catch (error) {
  //     console.log("An error occurred while retrieving token. ", error);
  //   }

  //   return currentToken;
  // };

  // requestPermission();

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  });

  return (
    <div className="app">
      <LoadScript googleMapsApiKey="AIzaSyCez882QWlP85wQRNooAi0llw1ymzL96zI"></LoadScript>
      <Header></Header>
      <Router>
        <div className="main-container">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/unwinds" element={<Unwinds />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
