import React from "react";
import logo from "../assets/logo.png";

const OfflineScreen = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <img src={logo} alt="logo" className="h-24 mb-8" />
      <div className="text-center w-28 md:w-full justify-center items-center ">
        <svg
          className="mx-auto h-16 w-16 text-purple-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9.172 14.828a4 4 0 01-.707-5.656m.707 5.656a4 4 0 000-5.656M19.071 4.929a9 9 0 00-12.728 0M3 3l18 18M3 21l18-18"
          />
        </svg>
        <h1 className="text-3xl text-purple-500 font-semibold mb-2">
          You're Offline
        </h1>
        <p className="text-lg  text-gray-600 mb-4">
          Check your network connection and try again.
        </p>
      </div>
    </div>
  );
};

export default OfflineScreen;
