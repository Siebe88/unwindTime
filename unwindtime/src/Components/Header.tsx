import './Header.css';
import React from 'react';
import Logo from '../Media/Logo.svg';


export default function Header() {
  return (
    <div className="top-header-container">
      <h1 className="top-header-title text-style-h-1">UNWIND</h1>
      <img src={Logo} alt=""/>
      <h1 className="top-header-title text-style-h-1">TIME</h1>
    </div>
  );
}
