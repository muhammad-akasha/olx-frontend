import React from "react";

const Loading = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-white">
      {/* Low-opacity background */}
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

      {/* Spinner */}
      <div className="relative z-20">
        <svg
          className="animate-spin h-10 w-10 text-teal-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C3.58 0 0 5.58 0 12h4zm2 5.292C6.832 18.648 8.79 20 12 20v-4c-1.253 0-2.5-.59-3.5-1.708l-2 2z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
