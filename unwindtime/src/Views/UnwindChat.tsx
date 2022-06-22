import './UnwindChat.css';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from '../Services/firebaseConnection';
import { useSelector } from 'react-redux';
import { GeneralState, Chat } from '../interfaces/interfaces'
import unwindLogo from '../Media/RelaxMethods/Coffee.svg';

import Unwind from '../Components/Unwind';
import ChatMessage from '../Components/ChatMessage';

function UnwindChat() {
  const navigate = useNavigate();
  const profile = useSelector((state: GeneralState) =>  state.profile.value);
  const location = useSelector((state: GeneralState) => state.location.value);

  let { unwindID } = useParams();
  // const [user, loadingAuth] = useAuthState(auth);
  const dummy = useRef<HTMLSpanElement>()

  const [unwind, loading, error] = useDocument(doc(db, 'unwinds', unwindID as string), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // Subscribe the devices corresponding to the registration tokens to the
  // topic.

  useEffect(() => {
    if (loading) return;
    // if (!user) return navigate('/');
    //@ts-ignore
    if (!unwind._document) return navigate('/unwinds');
    console.log('dummy',dummy)
   dummy.current?.scrollIntoView({ behavior: 'smooth' });

  }, [unwind]); //eslint-disable-line

  const [formValue, setFormValue] = useState('');

  const sendPush = async (chat: Chat) => {
    const body = {
      unwindID: unwindID,
      chat: chat,
    };

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(body);

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://us-central1-unwind-time.cloudfunctions.net/sendHttpPushNotificationMultiple',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  const sendMessage = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const chat = {
      text: formValue,
      profile: { profilePic: profile.profilePic, name: profile.name, uid: profile.uid },
      createdAt: Timestamp.fromDate(new Date()),
    };
    

    // Atomically add a new chatMessage and attachedFollowers
    //TODO add tokens
    const unwindRef = doc(db, 'unwinds', unwindID as string);
    console.log('chat', chat)
    console.log('profile uid', profile.uid)
    console.log('prof token', profile.token)
    await updateDoc(unwindRef, {
      chat: arrayUnion(chat),
      attachedUsers: arrayUnion(profile.uid),
      registrationTokens: arrayUnion(profile.token),
    });
    sendPush(chat);

    setFormValue('');
  dummy.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className="statusChat-container">
        <p>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Document: Loading...</span>}
        </p>
        {    //@ts-ignore
        unwind && unwind._document && (
          <Unwind
            key={unwind.id}
            unwind={unwind.data()}
            unwindID={unwind.id}
            location={location}
          ></Unwind>
        )}
      </div>
      <div className="chat-container">
        {
          unwind &&
          //@ts-ignore
          unwind
            .data()
            .chat.map((chat: Chat, index: React.Key | null | undefined) => <ChatMessage key={index} chat={chat}></ChatMessage>)}
        <span
        //@ts-ignore
        ref={dummy} ></span>
      </div>

      <form onSubmit={sendMessage} className="chat-fomr-container">
        <input
          className="chat-message-input text-style-h-3 "
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Let's unwind!!!"
        />

        <button type="submit" className="chat-submit-button" disabled={!formValue}>
          <img src={unwindLogo} alt="unwind logo" />
        </button>
      </form>
    </div>
  );
}

export default UnwindChat;
