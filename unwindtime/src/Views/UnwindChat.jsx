import './UnwindChat.css';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../Services/firebaseConnection';
import { useSelector } from 'react-redux';

import Unwind from '../Components/Unwind';
import ChatMessage from '../Components/ChatMessage';

function UnwindChat() {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile.value);
  const location = useSelector((state) => state.location.value);

  let { unwindID } = useParams();
  // const [user, loadingAuth] = useAuthState(auth);
  const dummy = useRef();

  const [unwind, loading, error] = useDocument(doc(db, 'unwinds', unwindID), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (loading) return;
    // if (!user) return navigate('/');
    if (!unwind._document) return navigate('/unwinds');
  }, [unwind]); //eslint-disable-line

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    const chat = {
      text: formValue,
      profile: { profilePic: profile.profilePic, name: profile.name, uid: profile.uid },
      createdAt: new Date(),
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
        {unwind && unwind._document && (
          <Unwind
            key={unwind.id}
            unwind={unwind.data()}
            unwindID={unwind.id}
            location={location}
          ></Unwind>
        )}
      </p>
      <div className="chat-container">
        {unwind &&
          unwind._document &&
          unwind.data().chat.map((chat) => <ChatMessage chat={chat}></ChatMessage>)}
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
