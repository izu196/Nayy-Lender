import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaHome,
  FaUser,
  FaPlus,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useAuth } from "../../providers/AuthProvider";
import { useTheme } from "../../providers/ThemeProvider";

const Header = ({ isLoggedIn, onLogout }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const links = (
    <ul className="flex items-center">
      {isLoggedIn ? (
        <>
          <li className="mx-4">
            <Link className="text-gray-200 hover:text-white" to="/home">
              Home
            </Link>
          </li>
          <li className="mx-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              {isDark ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-200" />
              )}
            </button>
          </li>
          <li className="mx-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              onClick={onLogout}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <li className="mx-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            {isDark ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-200" />
            )}
          </button>
        </li>
      )}
    </ul>
  );

  return (
    <nav className="bg-gray-800 p-4 md:h-20">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-8" />
        </Link>
        {isLoggedIn ? (
          <>
            <div className="hidden md:block">{links}</div>
          </>
        ) : (
          links
        )}
      </div>
      {isLoggedIn && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 shadow">
          {isLoggedIn && (
            <div className="flex justify-around">
              <Link
                to="/home"
                className="flex flex-col items-center justify-center p-2 text-gray-300 hover:text-blue-300"
                onClick={toggleDrawer}
              >
                <FaHome size={20} />
                <span className="text-sm font-medium">Home</span>
              </Link>

              <button
                className="flex flex-col items-center justify-center p-2 text-gray-300 hover:text-blue-300"
                // onClick={logout}
              >
                <FaSignOutAlt size={20} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </nav>
      )}
    </nav>
  );
};

export default Header;
