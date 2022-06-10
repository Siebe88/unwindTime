import './Dashboard.css';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../Services/firebase';

import RelaxMethod from '../Components/RelaxMethod';
import { useSelector, useDispatch } from 'react-redux';
import { switchFavo } from '../reducers/favoRelaxMethods';

import { relaxMethods } from '../Media/relaxMethodsSVG';
import { updateProfile } from '../Services/firestore';
import SetProfilePic from '../Components/SetProfilePic';

function Dashboard() {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state setting
  const profile = useSelector((state) => state.profile.value);
  const favoRelaxMethods = useSelector((state) => state.favoRelaxMethods);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user]); //eslint-disable-line

  const clickEventSaveProfile = async (e) => {
    e.preventDefault();

    updateProfile(profile, favoRelaxMethods);
    return navigate('/unwinds');
  };

  const onClickRelaxMethod = (relaxMethod) => {
    dispatch(switchFavo(relaxMethod));
  };

  return (
    <div className="dashboard-container">
      <div className="introtext-container">
        <h4 className="relaxmethodspicker-title text-style-h-3 text-style-white">
          Welcome, {profile.name}{' '}
        </h4>
        <h4 className="relaxmethodspicker-title text-style-h-3 text-style-white">
          please select a cool profile pic:
        </h4>
      </div>
      <SetProfilePic></SetProfilePic>

      <div className="relaxmethods-parent-container">
        <h3 className="relaxmethodspicker-title text-style-h-3">
          {' '}
          What are your favorite unwind activities?
        </h3>
        <div className="relaxmethods-container">
          {relaxMethods
            .sort((a, b) => a.id - b.id)
            .map((relaxMethod) => {
              return (
                <RelaxMethod
                  key={relaxMethod.id}
                  relaxMethod={relaxMethod}
                  onClickRelaxMethod={onClickRelaxMethod}
                  classColor={
                    favoRelaxMethods.some((method) => method.name === relaxMethod.name)
                      ? 'favoriteMethod'
                      : 'nonfavoriteMethod'
                  }
                />
              );
            })}
        </div>
      </div>

      <button className="dashboard__btn" onClick={clickEventSaveProfile}>
        {' '}
        Okay, let's unwind!
      </button>
      <button className="dashboard__btn" onClick={logout}>
        Logout
      </button>
      {/* </div> */}
    </div>
  );
}

export default Dashboard;
