import React from 'react';

export default function Button({
  extraClasses,
  buttonText,
  onClick,
}: {
  extraClasses: String;
  buttonText: String;
  onClick: any;
}) {
  return (
    <>
      <button
        className={`h-11 w-2/3 rounded-xl text-style-h-3 bg-gray-c-900 text-white drop-shadow-sm shadow-3xl  ${extraClasses}`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </>
  );
}
