import './Footer.css';
import React from 'react';
import { ReactComponent as Dashboard } from '../Media/Footer/dashboard.svg';
import { ReactComponent as Unwinds } from '../Media/Footer/unwinds.svg';
import { useNavigate } from 'react-router-dom';

const Footer = ({ show, current }) => {
  const navigate = useNavigate();

  const toDashboard = (page) => {
    return navigate(`/dashboard`);
  };

  const toUnwinds = (page) => {
    navigate(`/unwinds`);
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
    </div>
  );
};
export default Footer;
