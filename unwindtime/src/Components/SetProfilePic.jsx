import React from 'react';
import { storage } from '../Services/firebaseConnection';
import { useSelector, useDispatch } from 'react-redux';
import { changeProfilePic, changeProfileName } from '../reducers/profile';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { motion } from 'framer-motion';
import './SetProfilePic.css';

function SetProfilePic() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.value);

  const uploadFile = (profilePic) => {
    if (profilePic == null) return;
    const imageRef = ref(storage, `profilePics/${profilePic.name + v4()}`);
    uploadBytes(imageRef, profilePic).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        dispatch(changeProfilePic(url));
      });
    });
  };

  const onChangeProfileName = (event) => {
    console.log('ChangeValue', event.target.value);
    dispatch(changeProfileName(event.target.value));
  };

  return (
    <>
      <div className="introtext-container">
        <h4 className="relaxmethodspicker-title text-style-h-3 text-style-white">
          Welcome,{' '}
          <input
            autoComplete="off"
            value={profile.name}
            type="text"
            onChange={onChangeProfileName}
            className="profilename-input text-style-h-3 text-style-white"
          />
        </h4>
        <h4 className="relaxmethodspicker-title text-style-h-3 text-style-white">
          {profile.name} please select a cool profile pic:
        </h4>
      </div>
      <motion.button whileHover={{ scale: 1.1 }} className="action-button">
        <div className="image-upload">
          <label htmlFor="file-input">
            <img src={profile.profilePic} alt="profilePic" className="profile-dashboard-img" />
          </label>

          <input
            id="file-input"
            type="file"
            className="profilepic-input"
            onChange={(event) => {
              uploadFile(event.target.files[0]);
            }}
          />
        </div>
      </motion.button>
    </>
  );
}

export default SetProfilePic;
