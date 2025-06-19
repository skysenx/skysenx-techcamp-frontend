/* eslint-disable @next/next/no-img-element */
import React from "react";

const Logo = ({ w = "w-[121px]" }: { w?: string }) => {
  return (
    <div className={w}>
      <img
        className="h-full w-full object-contain"
        alt="Techcamp Logo"
        src="/images/texhcamp-logo.svg"
      />
    </div>
  );
};

export default Logo;
