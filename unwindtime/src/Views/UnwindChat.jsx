import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../Services/firebaseConnection';
import { useSelector } from 'react-redux';

import { auth } from '../Services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Unwind from '../Components/Unwind';

function UnwindChat() {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile.value);

  let { unwindID } = useParams();
  const [user, loadingAuth] = useAuthState(auth);
  const dummy = useRef();
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    latitude: null,
    longitude: null,
  });

  const [unwind, loading, error] = useDocument(doc(db, 'unwinds', unwindID), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) return navigate('/');
    getLocation();
  }, []); //eslint-disable-line

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setStatus('Unable to retrieve your location');
          console.log(status);
        }
      );
    }
  };

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log('UnwindID', unwindID);
    console.log(formValue);
    console.log(unwind);
    const chat = {
      text: formValue,
      profile: { profilePic: profile.profilePic, name: profile.name, uid: profile.uid },
    };

    const unwindRef = doc(db, 'unwinds', unwindID);

    // Atomically add a new region to the "regions" array field.
    await updateDoc(unwindRef, {
      chat: arrayUnion(chat),
      attachedUsers: arrayUnion(profile.uid),
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {unwind && (
          <Unwind
            key={unwind.id}
            unwind={unwind.data()}
            unwindID={unwind.id}
            location={location}
          ></Unwind>
        )}
      </p>
      <div className="chat-container">
        {unwind && <span>Document: {JSON.stringify(unwind.data().chat)}</span>}
        <span ref={dummy}></span>
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          {
            // eslint-disable-next-line
            '🕊️'
          }
        </button>
      </form>
    </div>
  );
}

export default UnwindChat;
