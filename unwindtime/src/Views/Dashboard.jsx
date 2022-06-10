import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../Services/firebase';

import RelaxMethod from '../Components/RelaxMethod';
import { useSelector, useDispatch } from 'react-redux';
import { switchFavo } from '../reducers/favoRelaxMethods';

import { relaxMethods } from '../Media/relaxMethodsSVG';
import { updateProfile } from '../Services/firestore';
import { storage } from '../Services/firebaseConnection';
import { ref, uploadBytes, getDownloadURL, listAll, list } from 'firebase/storage';
import { v4 } from 'uuid';

function Dashboard() {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state setting
  const profile = useSelector((state) => state.profile.value);
  const favoRelaxMethods = useSelector((state) => state.favoRelaxMethods);
  const [imageUpload, setImageUpload] = useState(null);

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

  const uploadFile = () => {
    console.log('image', imageUpload);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `profilePics/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
      });
    });
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
      <img className="profile-dashboard-img" src={profile.profilePic} alt="" />
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> upload Pic</button>

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

      {/* <div className="dashboard__container">
        Logged in as
        <div>{profile.displayName}</div>
        <div>{profile.email} </div> */}
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
