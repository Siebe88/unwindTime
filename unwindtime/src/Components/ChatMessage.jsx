import "./ChatMessage.css";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
// import { motion } from 'framer-motion';

//todo: refactor to typescript

export default function ChatMessage({ chat }) {
  const profile = useSelector((state) => state.profile.value);

  const messageClass = chat.profile.uid === profile.uid ? "sent" : "received";

  const formatTime = (datestamp) => {
    return moment(new Date(datestamp * 1000)).format("HH:mm");
  };

  return (
    <div className={`chatmessage-container ${messageClass}`}>
      <img
        src={chat.profile.profilePic}
        alt="profilePic"
        className="profilePic-chat-img"
      />
      <div className="chat-text-container">
        <h4 className="relaxmethodspicker-title text-style-h-3 text-style-white">
          {chat.profile.name}:
        </h4>
        <h4 className="relaxmethodspicker-title text-style-h-3 text-style-white">
          {chat.text}
        </h4>
        <p>{formatTime(chat.createdAt)}</p>
      </div>
    </div>
  );
}
