import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
import Register from './Views/Register';
import Reset from './Views/Reset';
import Dashboard from './Views/Dashboard';
import Unwinds from './Views/Unwinds';
import UnwindChat from './Views/UnwindChat';
import AllChats from './Views/AllChats';

import Header from './Components/Header';
import Footer from './Components/Footer';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Services/firebase';
import { useDispatch } from 'react-redux';
import { findProfile } from './Services/firestore';
import { loginProfile, changeProfileToken } from './reducers/profile';
import { addNewFavoArray } from './reducers/favoRelaxMethods';
import { setLocation } from './reducers/location';
import React, { useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';

import { messaging, onMessageListener } from './Services/firebaseConnection';

import { getToken, onMessage } from 'firebase/messaging';

function App() {
  const [user, loading] = useAuthState(auth);
  const [notification, setNotification] = useState({ title: '', body: '' });

  onMessageListener()
    .then((payload) => {
      setNotification({ title: payload.notification.title, body: payload.notification.body });
      console.log(payload);
      console.log('notifcation', notification);
    })
    .catch((err) => console.log('failed: ', err));

  const [status, setStatus] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) return;
    // if (!user) return navigate('/');
    fetchProfile();
    getLocation();
    getNotifcationToken();
  }, [user]); //eslint-disable-line

  const fetchProfile = async () => {
    try {
      const profileFound = await findProfile(user);
      dispatch(loginProfile(profileFound));
      dispatch(addNewFavoArray(profileFound.relaxMethods));
    } catch (err) {
      console.error(err);
    }
  };

  const getNotifcationToken = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey:
          'BKzLRtr6U6-LR6IJEd4MxZNDHioh-_y-17RAV9fOtnTAsBElwuTQtQTum8NN0tTDSNa-MO99uSTeBCKOgm1BTyc',
      });
      console.log('token', token);
      dispatch(changeProfileToken(token));
    } catch (err) {
      console.error(err);
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          dispatch(
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          );
        },
        () => {
          setStatus('Unable to retrieve your location');
          console.log(status);
        }
      );
    }
  };

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
            <Route path="/allchats" element={<AllChats />} />
            <Route path="/unwindChat/:unwindID" element={<UnwindChat />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
