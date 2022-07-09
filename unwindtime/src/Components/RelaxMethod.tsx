import React from 'react';
import './RelaxMethod.css';
import { RelaxMethodProps } from '../interfaces/interfaces';
export default function RelaxMethod({ relaxMethod, onClickRelaxMethod, classColor  }: RelaxMethodProps) {
    return (
    <div className={'relaxMethod ' + classColor}>
      <div className="relaxButton" onClick={() => onClickRelaxMethod(relaxMethod)}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <path
            transform={relaxMethod && relaxMethod.transform}
            className={'icon ' + classColor}
            d={relaxMethod && relaxMethod.svg}
          ></path>
        </svg>
      </div>
    </div>
    );
}
