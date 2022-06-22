import './ChatMessage.css';
import React from 'react';
import { useSelector } from 'react-redux';
import {ChatProps, GeneralState } from '../interfaces/interfaces'
import {formatTime} from '../Services/utils'

// import { motion } from 'framer-motion';



export default function ChatMessage( {chat}: ChatProps) {
  const profile = useSelector((state: GeneralState) => state.profile.value);

  const messageClass = chat.profile.uid === profile.uid ? 'sent' : 'received';


  return (
    <div className={`chatmessage-container ${messageClass}`}>
      <img src={chat.profile.profilePic} alt="profilePic" className="profilePic-chat-img" />
      <div className="chat-text-container">
        <h4 className="relaxmethodspicker-title text-style-h-3 text-style-white">
          {chat.profile.name}:
        </h4>
        <h4 className="relaxmethodspicker-title text-style-h-3 text-style-white">{chat?.text}</h4>
        <p>{formatTime(chat.createdAt)}</p>
      </div>
    </div>
  );
}
