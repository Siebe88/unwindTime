import './Header.css';
import React from 'react';
const Logo = require('../Media/Logo.svg') as string;


export default function Header() {
  return (
    <div className="top-header-container">
      <h1 className="top-header-title text-style-h-1">UNWIND</h1>
      <Logo />
      <h1 className="top-header-title text-style-h-1">TIME</h1>
    </div>
  );
}
