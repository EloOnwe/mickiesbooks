import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ handleShowAdd, username, handleLogout, token }) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleAddBook = () => {
    handleShowAdd();
    handleMenu();
  };

  return (
    <div className="navbar">
      <nav>
        <Link to={"/"}>
          <div className="logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDm8i6ocgjGHGcEWN7gA_XB7bTbQHjADZlcw&usqp=CAU"
              alt="logo"
              style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
            />
            <span>Mickies</span>
          </div>
        </Link>
        <div className="links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>

            {token ? (
              <li>
                <Link onClick={() => handleLogout()}> Logout</Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

            <li>
              <Link to="/contact">Contact</Link>
            </li>
            {token && (
              <li>
                <Link onClick={() => handleShowAdd()}>Add Book</Link>
              </li>
            )}
          </ul>
        </div>
        {username && (
          <div className="message">
            <span>Welcome </span> {username}
          </div>
        )}
        <div className="menu-burgar">
          <GiHamburgerMenu className="ham-menu" onClick={handleMenu} />
        </div>
        <div className={showMenu ? "mobile-links-show" : "mobile-links"}>
          <ul>
            <li>
              <Link to="/" onClick={handleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={handleMenu}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/signup" onClick={handleMenu}>
                Sign Up
              </Link>
            </li>
            {token ? (
              <li>
                <Link onClick={() => handleLogout()}>Log out</Link>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={handleMenu}>
                  Login
                </Link>
              </li>
            )}
            <li>
              <Link to="/contact" onClick={handleMenu}>
                Contact
              </Link>
            </li>
            {token && (
              <li>
                <Link onClick={handleAddBook}>Add Book</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
