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

  const Button = ({
    extraClasses,
    buttonText,
    onClick,
  }: {
    extraClasses: String;
    buttonText: String;
    onClick: any;
  }) => {
    return (
      <button
        className={`flex align-middle items-center justify-center h-2/6 w-2/3 rounded-xl text-style-h-3 bg-gray-c-900 text-white drop-shadow-sm shadow-3xl  ${extraClasses}`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    );
  };

  return (
    <div className=" dashboardPage flex flex-col justify-around items-center h-full ">
      <SetProfilePic></SetProfilePic>
      <div className="rounded-xl mx-3 drop-shadow-2xl bg-gray-c-100 shadow-3xl h-2/6 overflow-y-scroll">
        <h3 className="m-3 text-style-h-3"> What are your favorite unwind activities?</h3>
        <div className="flex flex-row items-center justify-center flex-wrap px-4 py-2 ">
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
                      : 'nonFavoriteMethod'
                  }
                />
              );
            })}
        </div>
      </div>
      <div className="flex flex-col items-center justify-around w-11/12 h-1/6 ">
        <Button extraClasses="bg-gray-c-900" buttonText="Okay, let's unwind!" onClick={clickEventSaveProfile}></Button>
        <Button extraClasses="bg-danger-600" buttonText="Logout" onClick={logout}></Button>
      </div>
    </div>
  );
}

export default Dashboard;
