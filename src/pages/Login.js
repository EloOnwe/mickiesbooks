import React, { useState } from "react";
import "../styles/login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken, setUsername }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const goToHomePage = () => {
    navigate("/");
  };

  const handleChange = (event) => {
    setFormData((preValue) => {
      return {
        ...preValue,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSigninSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }
    try {
      const response = await axios.post(
        "https://mickiesapp.onrender.com/login",
        formData
      );
      setToken(response.data.data.session.access_token);
      setUsername(response.data.data.user.user_metadata.username);
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

      goToHomePage();
    } catch (error) {
      toast.warn("Email not confirmed ");
    }
  };
  return (
    <div className="login">
      <form onClick={handleSigninSubmit}>
        <h2>Login</h2>

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
        <button type="submit">Login</button>
        <p>
          You don't have an account?
          <Link style={{ color: "red" }} to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
