import './Header.css';
import { ReactComponent as Logo } from '../Media/Logo.svg';
import React from 'react';

export default function Header() {
  return (
    <div className="top-header-container">
      <h1 className="top-header-title text-style-h-1">UNWIND</h1>
      <Logo />
      <h1 className="top-header-title text-style-h-1">TIME</h1>
    </div>
  );
}
