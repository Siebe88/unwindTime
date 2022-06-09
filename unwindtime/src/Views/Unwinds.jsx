import './Unwinds.css';

import React from 'react';
import { useSelector } from 'react-redux';
import { relaxMethods } from '../Media/relaxMethodsSVG';
// import { useNavigate } from 'react-router-dom';

import RelaxMethod from '../Components/RelaxMethod';

function Unwinds() {
  const favoRelaxMethods = useSelector((state) => state.favoRelaxMethods);

  return (
    <div className="unwinds-container">
      <div className="relaxmethods-container">
        <h3 className="relaxmethodspicker-title text-style-h-3"> How do you want to unwind?</h3>
        {relaxMethods.map((relaxMethod) => {
          return <RelaxMethod key={relaxMethod.id} relaxMethod={relaxMethod} />;
        })}
      </div>
    </div>
  );
}

export default Unwinds;
