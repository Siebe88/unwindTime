import './RelaxMethod.css';

export default function RelaxMethod({ relaxMethod, onClickRelaxMethod, classColor }) {
  return (
    <div className={'relaxMethod ' + classColor}>
      <div className="relaxButton" onClick={() => onClickRelaxMethod(relaxMethod)}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <path
            transform={relaxMethod.transform}
            className={'icon ' + classColor}
            d={relaxMethod.svg}
          ></path>
        </svg>
      </div>
    </div>
  );
}
