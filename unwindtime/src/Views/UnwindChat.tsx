import "./UnwindChat.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../Services/firebaseConnection";
import { useSelector } from "react-redux";
import UnwindLogo from "../Media/RelaxMethods/Coffee.svg";
import { requestOptions, State, Chat } from "../../Interfaces";
import Unwind from "../Components/Unwind";
import ChatMessage from "../Components/ChatMessage";

function UnwindChat() {
  const navigate = useNavigate();
  const profile = useSelector((state: State) => state.profile.value);
  const location = useSelector((state: State) => state.location.value);

  let { unwindID } = useParams();

  const dummy: any = useRef();

  const [unwind, loading, error] = useDocument(
    doc(db, "unwinds", unwindID as string),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // Subscribe the devices corresponding to the registration tokens to the
  // topic.

  useEffect(() => {
    if (loading) return;

    if (!unwind?.hasOwnProperty("_document")) return navigate("/unwinds");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  }, [loading, navigate, unwind]);

  const [formValue, setFormValue] = useState("");

  const sendPush = async (chat: Chat) => {
    const body = {
      unwindID: unwindID,
      chat: chat,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(body);

    var requestOptions: requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://us-central1-unwind-time.cloudfunctions.net/sendHttpPushNotificationMultiple",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const sendMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newchat = {
      text: formValue,
      profile: {
        profilePic: profile.profilePic,
        name: profile.name,
        uid: profile.uid,
        email: profile.email,
        relaxMethods: profile.relaxMethods,
        token: profile.token,
      },
      createdAt: new Date() as unknown as number,
    };

    // Atomically add a new chatMessage and attachedFollowers
    const unwindRef = doc(db, "unwinds", unwindID as string);
    await updateDoc(unwindRef, {
      chat: arrayUnion(newchat),
      attachedUsers: arrayUnion(profile.uid),
      registrationTokens: arrayUnion(profile.token),
    });

    sendPush(newchat);

    setFormValue("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-wrapper">
      <div className="statusChat-container">
        <p>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Document: Loading...</span>}
        </p>
        {unwind && unwind?.hasOwnProperty("_document") && (
          <Unwind
            key={unwind.id}
            unwind={unwind.data()}
            unwindID={unwind.id}
            location={location}
          ></Unwind>
        )}
      </div>
      <div className="chat-container">
        {unwind &&
          unwind?.hasOwnProperty("_document") &&
          unwind
            ?.data()
            ?.chat.map((chat: Chat, index: number) => (
              <ChatMessage key={index} chat={chat}></ChatMessage>
            ))}
        <span ref={dummy}></span>
      </div>

      <form onSubmit={sendMessage} className="chat-form-container">
        <input
          name="chatInput"
          className="chat-message-input text-style-h-3 "
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Let's unwind!!!"
        />

        <button
          type="submit"
          className="chat-submit-button"
          disabled={!formValue}
        >
          <img src={UnwindLogo}></img>
        </button>
      </form>
    </div>
  );
}

export default UnwindChat;
