import './Unwinds.css';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { motion } from 'framer-motion';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Services/firebase';

import UnwindFilterBox from '../Components/UnwindFilterBox';
import { ReactComponent as CreateUnwind } from '../Media/UnwindActionButtons/createUnwind.svg';
import { ReactComponent as List } from '../Media/UnwindActionButtons/list.svg';
import { ReactComponent as Map } from '../Media/UnwindActionButtons/map.svg';
import { useNavigate } from 'react-router-dom';
import Unwind from '../Components/Unwind';
import UnwindsMap from '../Components/UnwindsMap';

import { useCollection } from 'react-firebase-hooks/firestore';

import { createNewUnwind } from '../Services/unwinds';

import { collection, query, where } from 'firebase/firestore';
import { db } from '../Services/firebaseConnection';

function Unwinds() {
  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();
  const [location, setLocation] = useState({ lat: null, lng: null });

  const [fromUnwind, setFromUnwind] = useState(new Date());
  const [tillUnwind, setTillUnwind] = useState(moment(new Date()).add(15, 'minutes')._d);

  //Settings for live connection to unwinds
  const [status, setStatus] = useState(null);

  //Get's realtime new unwinds from firebase
  const queryUnwinds = query(collection(db, 'unwinds'), where('till', '>', fromUnwind));
  const [unwinds, loading, error] = useCollection(queryUnwinds, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const profile = useSelector((state) => state.profile.value);

  // set selected unwind method
  const [selectedUnwind, setSelectedUnwind] = useState({});

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) return navigate('/');
    getLocation();
  }, [user]); //eslint-disable-line

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          setStatus('Unable to retrieve your location');
          console.log(status);
        }
      );
    }
  };

  const createUnwind = () => {
    const unwind = {
      relaxMethod: selectedUnwind,
      from: fromUnwind,
      till: tillUnwind,
      location: location,
    };

    createNewUnwind(profile, unwind);
  };

  const onClickRelaxMethod = (relaxMethod) => {
    selectedUnwind.name !== relaxMethod.name
      ? setSelectedUnwind(relaxMethod)
      : setSelectedUnwind({});
  };

  function handleTillTimeChange(event) {
    const dateValue = moment(tillUnwind).format('YYYY-MM-DD');
    const newValue = moment(dateValue + ' ' + event.target.value);
    setTillUnwind(newValue._d);
  }

  function handleFromTimeChange(event) {
    const dateValue = moment(fromUnwind).format('YYYY-MM-DD');
    const newValue = moment(dateValue + ' ' + event.target.value);
    setFromUnwind(newValue._d);
  }

  return (
    <div className="unwinds-parent-container">
      <UnwindFilterBox
        onClickRelaxMethod={onClickRelaxMethod}
        selectedUnwind={selectedUnwind}
        handleTillTimeChange={handleTillTimeChange}
        handleFromTimeChange={handleFromTimeChange}
        fromUnwind={fromUnwind}
        tillUnwind={tillUnwind}
      ></UnwindFilterBox>
      <div className="unwindActions-container">
        {selectedUnwind.name ? (
          <motion.button
            whileHover={{ scale: 2.2 }}
            onClick={createUnwind}
            className="action-button"
          >
            {' '}
            <CreateUnwind />{' '}
          </motion.button>
        ) : (
          <></>
        )}
        <button className="action-button">
          {' '}
          <List />{' '}
        </button>
        <button className="action-button">
          {' '}
          <Map />{' '}
        </button>
      </div>
      <div className="unwinds-container">
        <div className="unwinds-status-container">
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
        </div>
        {location.lat && !loading ? (
          <UnwindsMap
            location={location}
            unwinds={unwinds.docs
              .filter(
                (unwind) =>
                  !selectedUnwind.name || unwind.data().relaxMethod.name === selectedUnwind.name
              )
              .map((unwind) => unwind.data())}
          ></UnwindsMap>
        ) : (
          <></>
        )}
        {/* For the list TODO: MAP */}
        {/* {unwinds && (
          <div>
            {unwinds.docs
              .filter(
                (unwind) =>
                  !selectedUnwind.name || unwind.data().relaxMethod.name === selectedUnwind.name
              )
              .map((unwind) => (
                <Unwind
                  key={unwind.id}
                  unwind={unwind.data()}
                  unwindID={unwind.id}
                  location={location}
                ></Unwind>
              ))}
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Unwinds;
