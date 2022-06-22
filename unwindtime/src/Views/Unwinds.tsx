/* eslint-disable @typescript-eslint/no-unused-vars */
import './Unwinds.css';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { motion } from 'framer-motion';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Services/firebase';

import UnwindFilterBox from '../Components/UnwindFilterBox';
import  createUnwindSVG from '../Media/UnwindActionButtons/createUnwind.svg' ;
import  listSVG from '../Media/UnwindActionButtons/list.svg';
import  mapSVG from '../Media/UnwindActionButtons/map.svg';
import { useNavigate } from 'react-router-dom';
import Unwind from '../Components/Unwind';
import UnwindsMap from '../Components/UnwindsMap';

import { useCollection } from 'react-firebase-hooks/firestore';

import { createNewUnwind } from '../Services/unwinds';
import { GeneralState, RelaxMethods } from '../interfaces/interfaces'
import { collection, query, where,  } from 'firebase/firestore';
import { db } from '../Services/firebaseConnection';

function Unwinds() {
  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();

  const [showMap, setShowMap] = useState(false);

  const [fromUnwind, setFromUnwind] = useState(new Date());
  // const [tillUnwind, setTillUnwind] = useState(moment(new Date()).add(15, 'minutes')._d);
  const [tillUnwind, setTillUnwind] = useState(moment(new Date()).add(15, 'minutes').toDate());

  //Get's realtime new unwinds from firebase
  const queryUnwinds = query(collection(db, 'unwinds'), where('till', '>', fromUnwind));
  const [unwinds, loading, error] = useCollection(queryUnwinds, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const profile = useSelector((state: GeneralState) => state.profile.value);
  const location = useSelector((state: GeneralState) => state.location.value);

  // set selected unwind method
  const [selectedUnwind, setSelectedUnwind] = useState<RelaxMethods>({
    id: Number(''),
    name: '',
    svg: '',
    transform:'',
  });

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) return navigate('/');
  }, []); //eslint-disable-line

  const createUnwind = () => {
    const unwind = {
      relaxMethod: selectedUnwind,
      from: fromUnwind,
      till: tillUnwind,
      location: location,
    };

    createNewUnwind(profile, unwind);
  };

  const onClickRelaxMethod = (relaxMethod: RelaxMethods ) => {
    selectedUnwind && selectedUnwind.name !== relaxMethod.name
      ? setSelectedUnwind(relaxMethod)
      : setSelectedUnwind({ id: Number(''), name: '', svg: '', transform: '' });
  };

  function handleTillTimeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const dateValue = moment(tillUnwind).format('YYYY-MM-DD');
    const newValue = moment(dateValue + ' ' + event.target.value);
    setTillUnwind(newValue.toDate());
  }

  function handleFromTimeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const dateValue = moment(fromUnwind).format('YYYY-MM-DD');
    const newValue = moment(dateValue + ' ' + event.target.value);
    setFromUnwind(newValue.toDate());
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

            <img src={createUnwindSVG} alt="create unwind" />

          </motion.button>
        ) : (
          <></>
        )}
        <button className="action-button">
          <img src={listSVG} alt="list unwinds" />
        </button>
        <button className="action-button">
          <img src={mapSVG} alt="map unwinds" />
        </button>
        <button className="action-button" >
          CLEAR
        </button>
      </div>
      <div className="unwinds-container">
        <div className="unwinds-status-container">
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
        </div>
        {showMap ? (
          location.lat && !loading ? (
            <UnwindsMap
              location={location}
              unwinds={unwinds && unwinds.docs.filter(
                (unwind) =>
                  !selectedUnwind.name || unwind.data().relaxMethod.name === selectedUnwind.name
              )}
            ></UnwindsMap>
          ) : (
            <></>
          )
        ) : (
          unwinds && (
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
          )
        )}
      </div>
    </div>
  );
}

export default Unwinds;
