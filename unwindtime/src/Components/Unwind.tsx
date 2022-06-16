import React from 'react';
import moment from 'moment';
import './Unwind.css';
import RelaxMethod from './RelaxMethod';
import { getDistance } from 'geolib';
import { useNavigate } from 'react-router-dom';
import { Props, UnwindType } from '../../Interfaces';
import { motion } from 'framer-motion';


export default function Unwind({ unwind, location, unwindID }:Props) {


  const navigate = useNavigate();
  const formatTime = (datestamp:number) => {
    return moment(new Date(datestamp * 1000)).format('HH:mm');
  };

  const distanceBetween =
    location.latitude && unwind.location.latitude
      ? `Distance: ${getDistance(location, unwind.location, 1)} meters away`
      : '~';

  const conClickToChat = () => {
    navigate(`/unwindchat/${unwindID}`);
  };

  return (
    <>
      <motion.button
        // whileHover={{ scale: 1.1 }}
        // whileTap={{ scale: 0.9 }}
        className="unwind-event-container"
        onClick={conClickToChat}
        unwind={unwind as unknown as UnwindType}
      >
        <img className="profile-unwind-img" src={unwind.createdBy.profilePic} alt="" />
        <div className="name-and-time-container">
          <p>{unwind.createdBy.name} </p>
          <p>{`${formatTime(unwind.from)} - ${formatTime(unwind.till)}`}</p>
          <p> {distanceBetween} </p>
        </div>
        <RelaxMethod
          relaxMethod={unwind.relaxMethod}
          classColor="favoriteMethod"
          onClickRelaxMethod={() => 1 + 1}
        ></RelaxMethod>
      </motion.button>
    </>
  );
}
