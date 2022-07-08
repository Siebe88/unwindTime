import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logInWithEmailAndPassword, signInWithGoogle } from '../Services/firebase';

import WelcomeSVG from '../Media/WelcomeSVG.svg';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="login__container">
        <img src={WelcomeSVG} className="WelcomeSVG" alt="Welcome" />
        <input
          name="email"
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          name="password"
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          name="login"
          className="login__btn"
          onClick={() => {
            logInWithEmailAndPassword(email, password);
            navigate('/dashboard');
          }}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset" data-test="resetLink">
            Forgot Password
          </Link>
        </div>
        <div data-test="noAccount">
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
