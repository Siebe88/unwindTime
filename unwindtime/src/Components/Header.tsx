import React from 'react';
import Logo from '../Media/Logo.svg';

export default function Header() {
  return (
    <div className=" flex justify-center items-center w-full bg-gray-c-900 text-gray-c-100 h-13">
      <h1 className=" mx-3 mt-1 text-style-h-1">UNWIND</h1>
      <img src={Logo} alt="" />
      <h1 className="mx-3 mt-1 text-style-h-1">TIME</h1>
    </div>
  );
}
