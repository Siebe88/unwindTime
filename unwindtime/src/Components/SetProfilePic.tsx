import React from "react";
import { storage } from "../Services/firebaseConnection";
import { useSelector, useDispatch } from "react-redux";
import { changeProfilePic, changeProfileName } from "../reducers/profile";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { motion } from "framer-motion";
import "./SetProfilePic.css";
import { State } from "../../Interfaces";

function SetProfilePic() {
  const dispatch = useDispatch();
  const profile = useSelector((state: State) => state.profile.value);

  const uploadFile = (profilePic: File) => {
    if (profilePic == null) return;
    const imageRef = ref(storage, `profilePics/${profilePic.name + v4()}`);
    uploadBytes(
      imageRef,
      profilePic as unknown as Blob | Uint8Array | ArrayBuffer
    ).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        dispatch(changeProfilePic(url));
      });
    });
  };

  const onChangeProfileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeProfileName(event.target.value));
  };

  return (
    <>
      <div className="introtext-container">
        <h3 className="relaxmethodspicker-title text-style-h-3 text-style-white">
          Welcome:{" "}
          <input
            autoComplete="off"
            value={profile.name}
            type="text"
            onChange={onChangeProfileName}
            className="profilename-input text-style-h-3 text-style-white"
            name="fortest"
          />
        </h3>
        <text className="relaxmethodspicker-title text-style-h-4 text-style-white">
          click on your profile picture to select a new one:
        </text>
      </div>
      <motion.button whileHover={{ scale: 1.1 }} className="action-button">
        <div className="image-upload">
          <label htmlFor="file-input">
            <img
              src={profile.profilePic}
              alt="profilePic"
              className="profile-dashboard-img"
            />
          </label>

          <input
            id="file-input"
            type="file"
            className="profilepic-input"
            onChange={(e?) => {
              let file = (e!.target as HTMLInputElement)!.files![0];
              uploadFile(file);
            }}
          />
        </div>
      </motion.button>
    </>
  );
}

export default SetProfilePic;
