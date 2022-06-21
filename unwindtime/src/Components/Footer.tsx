import './Footer.css';
import React from 'react';
import { useSelector } from 'react-redux';
// import { updateProfile } from '../Services/firestore';

import { useNavigate } from 'react-router-dom';

import { GeneralState } from '../interfaces/interfaces';

import dashboard from '../Media/Footer/dashboard.svg';
import unwinds from '../Media/Footer/unwinds.svg';
import chats from '../Media/Footer/chats.svg';
const { updateProfile }= require('../Services/firestore')

const Footer = () => {
  const navigate = useNavigate();

  const profile = useSelector((state: GeneralState) => state.profile.value);
  const favoRelaxMethods = useSelector((state: GeneralState) => state.favoRelaxMethods);

  const toDashboard = () => {
    return navigate(`/dashboard`);
  };

  const toUnwinds = () => {
    updateProfile(profile, favoRelaxMethods);
    navigate(`/unwinds`);
  };

  const toChats = () => {
    updateProfile(profile, favoRelaxMethods);
    navigate(`/allchats`);
  };

  return (
    <div className="footer-container">
      <button onClick={toDashboard} className="navButton notSelected">
      <img src={dashboard} alt= ''></img>
      </button>
      <button onClick={toUnwinds} className="navButton notSelected">
        <img src={unwinds} alt= ''></img>
      </button>
      <button onClick={toChats} className="navButton notSelected">
      <img src={chats} alt= ''></img>
      </button>
    </div>
  );
};
export default Footer;
