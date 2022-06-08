//css import
import './RelaxMethod.css';
import { useDispatch } from 'react-redux';
import { switchFavo } from '../reducers/favoRelaxMethods';

export default function RelaxMethod({ favorite, onclick, relaxMethod }) {
  const dispatch = useDispatch();

  return (
    <div className={'relaxMethod ' + favorite ? 'favoriteMethod' : 'nonfavoriteMethod'}>
      <button class="relaxButton" onClick={() => dispatch(switchFavo(relaxMethod))}>
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
