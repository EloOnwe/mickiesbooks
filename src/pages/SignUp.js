import React, { useState } from "react";
import axios from "axios";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setFormData((preValue) => {
      return {
        ...preValue,
        [event.target.name]: event.target.value,
      };
    });
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return;
    }

    try {
      const response = await axios.post(
        "https://mickiesapp.onrender.com/signup",
        formData
      );

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      goToLogin();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-page">
      <form onClick={handleSignUpSubmit}>
        <h2>Sign Up</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="your username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor=" email"> Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="your password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
