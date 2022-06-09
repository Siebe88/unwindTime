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
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Services/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, findProfile } from './Services/firestore';
import { loginProfile } from './reducers/profile';
import { addNewFavoArray } from './reducers/favoRelaxMethods';
import React, { useEffect } from 'react';

function App() {
  const [user, loading] = useAuthState(auth);
  // const navigate = useNavigate();

  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const profileFound = await findProfile(user);
      // console.log('FoundProfile', profileFound);

      dispatch(loginProfile(profileFound));
      dispatch(addNewFavoArray(profileFound.relaxMethods));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    // if (!user) return navigate('/');
    fetchProfile();
  }, [user]); //eslint-disable-line

  return (
    <div className="app">
      <Header></Header>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/unwinds" element={<Unwinds />} />
          <Route path="*" element={<Login />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
