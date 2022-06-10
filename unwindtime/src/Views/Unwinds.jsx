import './Unwinds.css';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { motion } from 'framer-motion';

// import { useNavigate } from 'react-router-dom';

import RelaxMethod from '../Components/RelaxMethod';
import { ReactComponent as CreateUnwind } from '../Media/UnwindActionButtons/createUnwind.svg';
import { ReactComponent as List } from '../Media/UnwindActionButtons/list.svg';
import { ReactComponent as Map } from '../Media/UnwindActionButtons/map.svg';
import Unwind from '../Components/Unwind';

import { useCollection } from 'react-firebase-hooks/firestore';

import { createNewUnwind } from '../Services/unwinds';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase';
import { getFirestore, collection } from 'firebase/firestore';

function Unwinds() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const [fromUnwind, setFromUnwind] = useState(new Date());
  const [tillUnwind, setTillUnwind] = useState(moment(new Date()).add(15, 'minutes')._d);

  //Settings for live connection to unwinds
  const [status, setStatus] = useState(null);
  const app = initializeApp(firebaseConfig);
  const [unwinds, loading, error] = useCollection(collection(getFirestore(app), 'unwinds'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // const favoRelaxMethods = useSelector((state) => state.favoRelaxMethods);
  const profile = useSelector((state) => state.profile.value);
  const favoRelaxMethods = useSelector((state) => state.favoRelaxMethods);

  // set selected unwind method
  const [selectedUnwind, setSelectedUnwind] = useState({});

  useEffect(() => {
    getLocation();
  }, []); //eslint-disable-line

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
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
    setSelectedUnwind({});
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

  const onClickRelaxMethod = (relaxMethod) => {
    selectedUnwind.name !== relaxMethod.name
      ? setSelectedUnwind(relaxMethod)
      : setSelectedUnwind({});
  };

  return (
    <div className="unwinds-parent-container">
      <div className="relaxmethods-selector-parent-container">
        <form action="">
          <h3 className="relaxmethodspicker-title text-style-h-3"> How do you want to unwind? </h3>
          <div className="relaxmethods-selector-container">
            {favoRelaxMethods.map((relaxMethod) => {
              return (
                <RelaxMethod
                  key={relaxMethod.id}
                  relaxMethod={relaxMethod}
                  onClickRelaxMethod={onClickRelaxMethod}
                  classColor={
                    selectedUnwind.name === relaxMethod.name
                      ? 'favoriteMethod'
                      : 'nonfavoriteMethod'
                  }
                />
              );
            })}
          </div>
          <div className="timesetter-container">
            <h3 className="text-style-h-3">From:</h3>
            <input
              type="time"
              min={moment(fromUnwind).format('HH:mm')}
              defaultValue={moment(fromUnwind).format('HH:mm')}
              onChange={handleFromTimeChange}
              required
            ></input>
            <h3 className="text-style-h-3">To:</h3>
            <input
              type="time"
              defaultValue={moment(tillUnwind).format('HH:mm')}
              onChange={handleTillTimeChange}
              required
            ></input>
          </div>
        </form>
      </div>
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
        {/* For the list TODO: MAP */}
        {unwinds && (
          <div>
            {unwinds.docs.map((unwind) => (
              <Unwind
                key={unwind.id}
                unwind={unwind.data()}
                unwindID={unwind.id}
                location={location}
              ></Unwind>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Unwinds;
