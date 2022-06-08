//css import
import './RelaxMethod.css';
import { useSelector, useDispatch } from 'react-redux';
import { switchFavo } from '../reducers/favoRelaxMethods';

export default function RelaxMethod({ relaxMethod }) {
  const dispatch = useDispatch();
  const favoRelaxMethods = useSelector((state) => state.favoRelaxMethods);

  const classFav = favoRelaxMethods.some((method) => method.name === relaxMethod.name)
    ? 'favoriteMethod'
    : 'nonfavoriteMethod';

  return (
    <div className={'relaxMethod ' + classFav}>
      <button className="relaxButton" onClick={() => dispatch(switchFavo(relaxMethod))}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <path
            transform={relaxMethod.transform}
            className={'icon ' + classFav}
            d={relaxMethod.svg}
          ></path>
        </svg>
      </button>
    </div>
  );
}
