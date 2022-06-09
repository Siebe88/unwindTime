import './Footer.css';
import React from 'react';
import { ReactComponent as Dashboard } from '../Media/Footer/dashboard.svg';
import { ReactComponent as Unwinds } from '../Media/Footer/unwinds.svg';
import { ReactComponent as Chats } from '../Media/Footer/chats.svg';
import { ReactComponent as CreateUnwind } from '../Media/Footer/createUnwind.svg';
import { useNavigate } from 'react-router-dom';

const Footer = ({ show, current }) => {
  // const footerIcons = [
  //   { name: 'Dashboard', svg: Dashboard },
  //   { name: 'Unwinds', svg: Unwinds },
  //   { name: 'Chats', svg: Chats },
  //   { name: 'CreateUnwind', svg: CreateUnwind },
  // ];
  const navigate = useNavigate();

  const toDashboard = (page) => {
    return navigate(`/dashboard`);
  };

  const toUnwinds = (page) => {
    navigate(`/unwinds`);
  };

  const toChats = (page) => {
    navigate(`/dashboard`);
  };

  const toCreateUnwind = (page) => {
    navigate(`/createUnwind`);
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
      <button onClick={toCreateUnwind} className="navButton notSelected">
        {' '}
        <CreateUnwind />{' '}
      </button>
    </div>
  );
};
export default Footer;
