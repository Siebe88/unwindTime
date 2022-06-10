import React from 'react';

export default function Unwind({ unwind }) {
  console.log('data:', unwind);
  // console.log('key:', key);
  return (
    <>
      <h1> {unwind.relaxMethod}</h1>
    </>
  );
}
