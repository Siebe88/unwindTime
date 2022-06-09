import './Unwinds.css';

import React from 'react';
import { useSelector } from 'react-redux';
import { relaxMethods } from '../Media/relaxMethodsSVG';
// import { useNavigate } from 'react-router-dom';

import RelaxMethod from '../Components/RelaxMethod';
import { ReactComponent as CreateUnwind } from '../Media/UnwindActionButtons/createUnwind.svg';
import { ReactComponent as List } from '../Media/UnwindActionButtons/list.svg';
import { ReactComponent as Map } from '../Media/UnwindActionButtons/map.svg';

// import { createUnwind } from '../Services/unwinds';

function Unwinds() {
  const favoRelaxMethods = useSelector((state) => state.favoRelaxMethods);
  const profile = useSelector((state) => state.profile.value);
  console.log(favoRelaxMethods);

  const createUnwind = () => {
    const unwind = {
      relaxMethod: 'Chess',
      from: '12:00',
      to: '13:00',
    };

    console.log('Input:', profile, unwind);
    // createUnwind(profile, unwind);
    console.log('Unwind created');
  };

  return (
    <div className="unwinds-container">
      <div className="relaxmethods-container">
        <h3 className="relaxmethodspicker-title text-style-h-3">
          {' '}
          How do you want to unwind? {profile.name}
        </h3>
        {relaxMethods.map((relaxMethod) => {
          return <RelaxMethod key={relaxMethod.id} relaxMethod={relaxMethod} />;
        })}
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
    </div>
  );
}

export default Unwinds;
