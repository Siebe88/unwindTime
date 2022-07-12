import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  // signInWithFacebook,
} from '../Services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import welcomeSVG from '../Media/WelcomeSVG.svg';

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
    <div className="flex flex-col items-center justify-evenly item p-7 h-full text-style-h-3">
      <img src={welcomeSVG} alt="welcome" className=" h-2/5" />

      <div className="flex flex-col w-4/5 ">
        <input
          type="email"
          className="p-2 font-normal mb-2 rounded-xl shadow-3xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="p-2 font-normal mb-2 rounded-xl w-4/4  shadow-3xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          name="login"
          className="text-gray-c-100 bg-gray-c-1000 my-5 rounded-xl shadow-3xl basis-12 "
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button
          className=" text-gray-c-100 basis-12 bg-primary-900 mb-5 rounded-xl shadow-3xl"
          onClick={signInWithGoogle}
        >
          Login with Google
        </button>
        {/* <button className="login__btn login__facebook" onClick={signInWithFacebook}>
          Login with Facebook
        </button> */}
      </div>
      <div className="flex flex-col  w-full">
        <Link to="/reset">Forgot Password</Link>
        <div className=" block ">
          Don't have an account?
          <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
