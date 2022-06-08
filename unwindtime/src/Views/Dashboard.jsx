import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from '../Services/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

import RelaxMethod from '../Components/RelaxMethod';
import { useSelector, useDispatch } from 'react-redux';
import { loginProfile } from '../reducers/profile';

import { relaxMethods } from '../Media/relaxMethodsSVG';
import './Dashboard.css';

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  // Redux state setting
  const profile = useSelector((state) => state.profile.value);
  const dispatch = useDispatch();

  //TODO REMOVE - For testing
  const favoRelaxMethods = useSelector((state) => state.favoRelaxMethods);

  const fetchUserName = async () => {
    try {
      //Can we remove this?
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(data);
      //Not this
      dispatch(loginProfile(user));
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');

    fetchUserName();
    // }, [user, loading]);
  });

  return (
    <div className="dashboard-container">
      <div className="introtext-container">
        <p>Welcome, </p>
        <br></br>
        <p>please select a cool profile pic:</p>
      </div>

      <div className="relaxmethods-container">
        <h3 className="relaxmethodspicker-title text-style-h-3">
          {' '}
          What are your favorite unwind activities
        </h3>

        {relaxMethods
          .sort((a, b) => a.id - b.id)
          .map((relaxMethod) => {
            return <RelaxMethod key={relaxMethod.id} relaxMethod={relaxMethod} />;
          })}
      </div>

      <div className="dashboard__container">
        Logged in as
        <div>{profile.displayName}</div>
        <div>{profile.email} </div>
        <button className="dashboard__btn" onClick={() => dispatch(loginProfile(user))}>
          {' '}
          test profile
        </button>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
        {favoRelaxMethods.map((favo) => (
          <p>{favo.name}</p>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
