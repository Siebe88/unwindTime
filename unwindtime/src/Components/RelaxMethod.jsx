//css import
import './RelaxMethod.css';

export default function RelaxMethod({ favorite, onclick, relaxMethod }) {
  return (
    <div className={'relaxMethod ' + favorite ? 'favoriteMethod' : 'nonfavoriteMethod'}>
      <button class="relaxButton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          // fill="#c6a8a7"
          viewBox="0 0 50 50"
        >
          <path transform={relaxMethod.transform} class="icon" d={relaxMethod.svg}></path>
        </svg>
      </button>
    </div>
  );
}
