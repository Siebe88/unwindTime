import React from 'react';
import moment from 'moment';
import './Unwind.css';
import RelaxMethod from '../Components/RelaxMethod';
import { getDistance } from 'geolib';
import { useNavigate } from 'react-router-dom';

export default function Unwind({ unwind, location }) {
  const navigate = useNavigate();
  const formatTime = (datestamp) => {
    return moment(new Date(datestamp * 1000)).format('HH:mm');
  };

  const distanceBetween = getDistance(location, unwind.location, 1);

  const conClickToChat = (unwindEvent) => {
    navigate('/unwindchat', { state: { id: 1, name: 'sabaoon' } });
    console.log('test');
  };

  return (
    <div className="unwind-event-container" onClick={conClickToChat}>
      <img className="profile-img" src={unwind.profilePic} alt="" />
      <div className="name-and-time-container">
        <p> {unwind.name} needs a break </p>
        <p>{`${formatTime(unwind.from)} - ${formatTime(unwind.till)}`}</p>
        <p> {distanceBetween} meters away </p>
      </div>
      <RelaxMethod relaxMethod={unwind.relaxMethod} classColor="favoriteMethod"></RelaxMethod>
    </div>
  );
}
