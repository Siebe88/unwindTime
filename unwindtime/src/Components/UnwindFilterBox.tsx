import React from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';
import { UnwindFilterBoxProps, GeneralState } from '../interfaces/interfaces';
import RelaxMethod from './RelaxMethod';

function UnwindFilterBox({
  onClickRelaxMethod,
  selectedUnwind,
  handleTillTimeChange,
  handleFromTimeChange,
  fromUnwind,
  tillUnwind,
}: UnwindFilterBoxProps) {
  const favoRelaxMethods = useSelector(
    (state: GeneralState) => state.favoRelaxMethods
  );

  return (
    <div className="relaxmethods-selector-parent-container">
      <form action="">
        <h3 className="relaxmethodspicker-title text-style-h-3">
          {' '}
          How do you want to unwind?{' '}
        </h3>
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
  );
}

export default UnwindFilterBox;
