import React from 'react';
import moment from 'moment';

export default function Unwind({ unwind }) {
  // console.log('data:', unwind);
  // console.log('key:', key);

  const formatTime = (datestamp) => {
    return moment(new Date(datestamp * 1000)).format('hh:mm');
  };

  return (
    <>
      <h1>
        {/* {unwind.from} - {unwind.till} {unwind.relaxMethod} */}
        {`From: ${formatTime(unwind.from)}`}
        {unwind.relaxMethod}
      </h1>
    </>
  );
}
