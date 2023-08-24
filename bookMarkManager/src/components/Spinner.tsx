import React from "react";
import { ProgressBar } from "react-loader-spinner";
const Spinner = ({ message }) => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#cd7b23"
        barColor="#cd7b23"
      />
      <h1 className="text-md md:text-lg">{message}</h1>
    </div>
  );
};

export default Spinner;