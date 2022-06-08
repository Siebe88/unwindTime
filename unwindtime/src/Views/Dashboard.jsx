import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../Services/firebase';

import RelaxMethod from '../Components/RelaxMethod';
import { useSelector, useDispatch } from 'react-redux';
import { loginProfile } from '../reducers/profile';

import { relaxMethods } from '../Media/relaxMethodsSVG';
import updateUser from '../Services/firestore';
import './Dashboard.css';

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  // Redux state setting
  const profile = useSelector((state) => state.profile.value);
  const favoRelaxMethods = useSelector((state) => state.favoRelaxMethods);

  const dispatch = useDispatch();

  const fetchUserName = async () => {
    try {
      dispatch(loginProfile(user));
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');

    fetchUserName();
  });

  const clickEventSaveProfile = async (e) => {
    console.log('clicked');
    e.preventDefault();
    updateUser(profile, favoRelaxMethods);
  };

  return (
    <div className="dashboard-container">
      <div className="introtext-container">
        <p>Welcome, {profile.displayName} </p>
        <br></br>
        <p>please select a cool profile pic:</p>
      </div>

      <div className="relaxmethods-container">
        <h3 className="relaxmethodspicker-title text-style-h-3">
          {' '}
          What are your favorite unwind activities
        </h3>

        {relaxMethods
          .sort((a, b) => a.id - b.id)
          .map((relaxMethod) => {
            return <RelaxMethod key={relaxMethod.id} relaxMethod={relaxMethod} />;
          })}
      </div>

      <div className="dashboard__container">
        Logged in as
        <div>{profile.displayName}</div>
        <div>{profile.email} </div>
        <button className="dashboard__btn" onClick={clickEventSaveProfile}>
          {' '}
          Okay, let's unwind!
        </button>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
