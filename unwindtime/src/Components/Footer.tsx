import './Footer.css';
import React from 'react';
import { ReactComponent as Dashboard } from '../Media/Footer/dashboard.svg';
import { ReactComponent as Unwinds } from '../Media/Footer/unwinds.svg';
import { ReactComponent as Chats } from '../Media/Footer/chats.svg';
import { useSelector } from 'react-redux';
import { updateProfile } from '../Services/firestore';

import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile.value);
  const favoRelaxMethods = useSelector((state) => state.favoRelaxMethods);

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
        {' '}
        <Dashboard />{' '}
      </button>
      <button onClick={toUnwinds} className="navButton notSelected">
        {' '}
        <Unwinds />{' '}
      </button>
      <button onClick={toChats} className="navButton notSelected">
        {' '}
        <Chats />{' '}
      </button>
    </div>
  );
};
export default Footer;
