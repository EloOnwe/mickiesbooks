import React, { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import AddComp from "./components/AddComp";
import DetailPage from "./pages/DetailPage";

const App = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [token, setToken] = useState(false);
  const [username, setUsername] = useState("");

  if (token) {
    localStorage.setItem("token", token);
  }

  if (username) {
    localStorage.setItem("username", username);
  }

  const getUser = async () => {
    const storedName = localStorage.getItem("username");
    setUsername(storedName);
  };

  const getToken = () => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  };

  useEffect(() => {
    getUser();
    getToken();
  }, []);

  const handleShowAdd = () => {
    setShowAdd(!showAdd);
  };

  // After explicit logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    setUsername("");
    setToken("");

    window.location = "/login";
  };

  return (
    <div className="app">
      <header>
        <Navbar
          handleShowAdd={handleShowAdd}
          username={username}
          handleLogout={handleLogout}
          token={token}
        />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={<Login setToken={setToken} setUsername={setUsername} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:id" element={<DetailPage token={token} />} />
        </Routes>
        {showAdd && (
          <div className="add" onClick={() => handleShowAdd()}>
            <AddComp handleShowAdd={handleShowAdd} />
          </div>
        )}
      </main>
      <footer>
        <p>&copy; 2023 Mickies books. All rights reserved.</p>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default App;
