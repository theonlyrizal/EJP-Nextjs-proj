'use client';
import React from 'react';

const SectionBody = ({ children, className, style }) => {
  return (
    <div
      className={`flex flex-col justify-start items-center w-full px-3 sm:px-5 md:px-[5vw] my-10 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default SectionBody;
