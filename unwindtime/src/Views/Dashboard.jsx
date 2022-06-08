import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { auth, db, logout } from '../Services/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import RelaxMethod from '../Components/RelaxMethod';

import { relaxMethods } from '../Media/relaxMethodsSVG';

function Dashboard() {
  // const [user, loading, error] = useAuthState(auth);
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
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

  // const relaxMethods = [1, 2, 3, 4, 5, 6];

  console.log(relaxMethods);

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
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
