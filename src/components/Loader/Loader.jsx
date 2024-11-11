import React from "react";

function Loader() {
  const randomShade = () => {
    const shades = [
      "bg-indigo-500",
      "bg-indigo-600",
      "bg-indigo-700",
      "bg-indigo-800",
      "bg-indigo-900",
      "bg-purple-500",
      "bg-purple-600",
      "bg-purple-700",
      "bg-purple-800",
      "bg-purple-900",
      "bg-blue-500",
      "bg-blue-600",
      "bg-blue-700",
      "bg-blue-800",
      "bg-blue-900",
      "bg-sky-500",
      "bg-sky-600",
      "bg-sky-700",
      "bg-sky-800",
      "bg-sky-900",
    ];
    const randomIndex = Math.floor(Math.random() * shades.length);
    return shades[randomIndex];
  };

  return (
    <div className="fixed top-0 left-0 h-full w-full z-50 flex justify-center items-center">
      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50 z-40"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div
          className={`shadow-lg object-center items-center justify-center w-32 grid grid-cols-2 gap-2 text-white container mx-auto ${randomShade()} px-6 py-10 border-2 rounded-md motion-safe:animate-pulse`}
        >
          <div
            className={`w-6 h-10 border-white border-4 ${randomShade()} rounded-full motion-safe:animate-bounce`}
          />
          <div className="w-6 h-10 border-white border-4 bg-white rounded-full motion-safe:animate-spin" />
          <div
            className={`w-6 h-10 border-white border-4 ${randomShade()} rounded-full motion-safe:animate-spin`}
          />
          <div className="w-6 h-10 border-white border-4 bg-white rounded-full motion-safe:animate-bounce" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
