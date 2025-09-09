import React from "react";
import { Outlet, Link } from "react-router-dom";

const Theory = () => {
  return (
    <div className="p-6 bg-gray-100 rounded shadow-lg">
      <nav className="flex justify-center space-x-6 mb-6">
        <Link
          to="text"
          className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
          HTML
        </Link>
        <Link
          to="style"
          className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
          CSS
        </Link>
        <Link
          to="script"
          className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
          JS
        </Link>
        <Link
          to="react"
          className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
          React
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Theory;
