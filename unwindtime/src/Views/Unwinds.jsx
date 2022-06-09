import './Unwinds.css';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { relaxMethods } from '../Media/relaxMethodsSVG';
// import { useNavigate } from 'react-router-dom';

import RelaxMethod from '../Components/RelaxMethod';
import { ReactComponent as CreateUnwind } from '../Media/UnwindActionButtons/createUnwind.svg';
import { ReactComponent as List } from '../Media/UnwindActionButtons/list.svg';
import { ReactComponent as Map } from '../Media/UnwindActionButtons/map.svg';

import { useCollection } from 'react-firebase-hooks/firestore';

import { createNewUnwind } from '../Services/unwinds';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase';
import { getFirestore, collection } from 'firebase/firestore';

function Unwinds() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const app = initializeApp(firebaseConfig);
  // const db = getFirestore(app);

  const [value, loading, error] = useCollection(collection(getFirestore(app), 'unwinds'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // const favoRelaxMethods = useSelector((state) => state.favoRelaxMethods);
  const profile = useSelector((state) => state.profile.value);

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
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
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
      relaxMethod: 'Chess',
      from: '12:00',
      to: '13:00',
      location: { lat: lat, lng: lng },
    };

    createNewUnwind(profile, unwind);
  };

  return (
    <div className="unwinds-container">
      <div className="relaxmethods-selector-parent-container">
        <h3 className="relaxmethodspicker-title text-style-h-3"> How do you want to unwind? </h3>
        <div className="relaxmethods-selector-container">
          {relaxMethods.map((relaxMethod) => {
            return <RelaxMethod key={relaxMethod.id} relaxMethod={relaxMethod} />;
          })}
        </div>
      </div>
      <div className="unwindActions-container">
        <button onClick={createUnwind} className="action-button">
          {' '}
          <CreateUnwind />{' '}
        </button>
        <button className="action-button">
          {' '}
          <List />{' '}
        </button>
        <button className="action-button">
          {' '}
          <Map />{' '}
        </button>
      </div>
      <div>
        <p>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
          {value && (
            <span>
              Collection:{'unwinds'}
              {value.docs.map((doc) => (
                <React.Fragment key={doc.id}>{JSON.stringify(doc.data())}, </React.Fragment>
              ))}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default Unwinds;
