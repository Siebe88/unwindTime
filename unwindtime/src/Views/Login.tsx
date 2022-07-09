import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  // signInWithFacebook,
} from '../Services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import welcomeSVG  from '../Media/WelcomeSVG.svg';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/dashboard');
  });

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__container__welcome">
          <img src={welcomeSVG} alt="welcome" />
        </div>
        <input
          type="email"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button name="login" className="login__btn" onClick={() => logInWithEmailAndPassword(email, password)}>
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        {/* <button className="login__btn login__facebook" onClick={signInWithFacebook}>
          Login with Facebook
        </button> */}
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
