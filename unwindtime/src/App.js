import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
import Register from './Views/Register';
import Reset from './Views/Reset';
import Dashboard from './Views/Dashboard';
import Unwinds from './Views/Unwinds';

import Header from './Components/Header';
import Footer from './Components/Footer';

//SMART?
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Services/firebase';
import { useDispatch } from 'react-redux';
import { findProfile } from './Services/firestore';
import { loginProfile } from './reducers/profile';
import { addNewFavoArray } from './reducers/favoRelaxMethods';
import React, { useEffect } from 'react';

function App() {
  const [user, loading] = useAuthState(auth);

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

  useEffect(() => {
    if (loading) return;
    fetchProfile();
  }, [user]); //eslint-disable-line

  return (
    <div className="app">
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
