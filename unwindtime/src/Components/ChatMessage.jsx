import './ChatMessage.css';
import React from 'react';
// import moment from 'moment';
// import { motion } from 'framer-motion';

export default function ChatMessage({ chat }) {
  return (
    <div className="chatmessage-container">
      <img src={chat.profile.profilePic} alt="profilePic" className="profilePic-chat-img" />
      <h1>{chat.text}</h1>
    </div>
  );
}
