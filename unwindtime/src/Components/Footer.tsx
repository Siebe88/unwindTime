import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
// import { updateProfile } from '../Services/firestore';

import { useNavigate } from 'react-router-dom';

import { GeneralState } from '../interfaces/interfaces';

import dashboard from '../Media/Footer/dashboard.svg';
import unwinds from '../Media/Footer/unwinds.svg';
import chats from '../Media/Footer/chats.svg';
import { updateProfile } from '../Services/firestore';

const Footer = () => {
  const navigate = useNavigate();

  const profile = useSelector((state: GeneralState) => state.profile.value);
  const favoRelaxMethods = useSelector((state: GeneralState) => state.favoRelaxMethods);

  const buttons = [
    { page: 'dashboard', img: dashboard },
    { page: 'unwinds', img: unwinds },
    { page: 'allchats', img: chats },
  ];

  const toPage = (page: string) => {
    updateProfile(profile, favoRelaxMethods);
    navigate(`/${page}`);
  };

  const NavButton = ({ img, page }: { img: any; page: string }) => {
    return (
      <>
        <motion.button whileHover={{ scale: 1.2 }} onClick={() => toPage(page)}>
          <img className=" h-10" src={img} alt=""></img>
        </motion.button>
      </>
    );
  };

  return (
    <div className="flex justify-around items-center w-full bg-gray-c-900 text-gray-c-100 h-16">
      {buttons.map((butt) => {
        return <NavButton img={butt.img} page={butt.page}></NavButton>;
      })}
    </div>
  );
};
export default Footer;
