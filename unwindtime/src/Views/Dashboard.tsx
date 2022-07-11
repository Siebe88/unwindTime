import './Dashboard.css';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../Services/firebase';

import RelaxMethod from '../Components/RelaxMethod';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavo } from '../reducers/favoRelaxMethods';

import relaxMethods from '../Media/relaxMethodsSVG';
import { updateProfile } from '../Services/firestore';
import SetProfilePic from '../Components/SetProfilePic';
import { GeneralState, RelaxMethods } from '../interfaces/interfaces';

function Dashboard() {
  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state setting
  const profile = useSelector((state: GeneralState) => state.profile.value);
  const favoRelaxMethods = useSelector((state: GeneralState) => state.favoRelaxMethods);

  //BUG need to rework routing
  useEffect(() => {
    if (loadingAuth) return;
    if (!user) return navigate('/');
  }); //eslint-disable-line

  const clickEventSaveProfile = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    updateProfile(profile, favoRelaxMethods);
    if (favoRelaxMethods.length === 0) {
      alert('Please select at least one Unwind activity.');
    } else {
      return navigate('/unwinds');
    }
  };

  const onClickRelaxMethod = (relaxMethod: RelaxMethods) => {
    dispatch(toggleFavo(relaxMethod));
  };

  return (
    <div className="flex flex-col justify-around items-center h-full">
      <SetProfilePic></SetProfilePic>

      <div className="rounded-xl mx-3 drop-shadow-2xl bg-gray-c-100">
        <h3 className="m-5 text-style-h-3"> What are your favorite unwind activities?</h3>
        <div className="flex flex-row items-center justify-center flex-wrap px-4 py-4">
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

      <button
        className=" dashboard__btn go_button text-style-h-3 bg-gray-c-900 text-white drop-shadow-sm"
        onClick={clickEventSaveProfile}
      >
        {' '}
        Okay, let's unwind!
      </button>
      <button className="dashboard__btn text-style-h-3 bg-danger-600 text-white drop-shadow-3xl" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
