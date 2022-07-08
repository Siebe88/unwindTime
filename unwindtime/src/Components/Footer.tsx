import "./Footer.css";
import React from "react";
import dashboard from "../Media/Footer/dashboard.svg";
import unwinds from "../Media/Footer/unwinds.svg";
import chats from "../Media/Footer/chats.svg";
import { useSelector } from "react-redux";
import { updateProfile } from "../Services/firestore";

import { useNavigate } from "react-router-dom";
import { RelaxOption, State } from "../../Interfaces";
const Footer = () => {
  const navigate = useNavigate();

  const profile = useSelector((state: State) => state.profile.value);
  const favoRelaxMethods = useSelector(
    (state: State) => state.favoRelaxMethods
  );

  const toDashboard = () => {
    return navigate(`/dashboard`);
  };

  const toUnwinds = () => {
    updateProfile(profile, favoRelaxMethods as unknown as RelaxOption);
    navigate(`/unwinds`);
  };

  const toChats = () => {
    updateProfile(profile, favoRelaxMethods as unknown as RelaxOption);
    navigate(`/allchats`);
  };

  return (
    <div className="footer-container">
      <button
        name="toDashboardBtn"
        onClick={toDashboard}
        className="navButton notSelected"
      >
        <img src={dashboard}></img>
      </button>
      <button
        name="toUnwindsBtn"
        onClick={toUnwinds}
        className="navButton notSelected toUnwindsBtn"
      >
        {" "}
        <img src={unwinds}></img>
      </button>
      <button
        name="chatsbtn"
        onClick={toChats}
        className="navButton notSelected"
      >
        {" "}
        <img src={chats}></img>
      </button>
    </div>
  );
};
export default Footer;
