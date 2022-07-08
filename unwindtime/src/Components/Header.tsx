import './Header.css';
import logo from '../Media/Logo.svg';
import React from 'react';

export default function Header() {
  return (
    <div className="top-header-container">
      <h1 className="top-header-title text-style-h-1">UNWIND</h1>
      <img src={logo} alt="UnwindLogo"></img>
      <h1 className="top-header-title text-style-h-1">TIME</h1>
    </div>
  );
}
