import React from 'react';
import './RelaxMethod.css';
import { Props } from '../../Interfaces';
export default function RelaxMethod({ relaxMethod, onClickRelaxMethod, classColor }:Props) {
  return (
    <div className={'relaxMethod ' + classColor}>
      <div className="relaxButton" onClick={() => onClickRelaxMethod!(relaxMethod)}  title={relaxMethod?.name}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <path
            transform={relaxMethod?.transform}
            className={'icon ' + classColor}
            d={relaxMethod?.svg}
          ></path>
        </svg>
      </div>
    </div>
  );
}
