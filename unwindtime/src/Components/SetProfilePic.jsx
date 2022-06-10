import React, { useState } from 'react';
import { storage } from '../Services/firebaseConnection';
import { useSelector, useDispatch } from 'react-redux';
import { changeProfilePic } from '../reducers/profile';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

function SetProfilePic() {
  const [imageUpload, setImageUpload] = useState(null);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.value);

  const uploadFile = () => {
    console.log('image', imageUpload);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `profilePics/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        dispatch(changeProfilePic(url));
      });
    });
  };

  return (
    <>
      <img className="profile-dashboard-img" src={profile.profilePic} alt="" />
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
          // uploadFile();
        }}
      />
      <button onClick={uploadFile}> upload Pic</button>
    </>
  );
}

export default SetProfilePic;
