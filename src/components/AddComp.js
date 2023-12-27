import React, { useState } from "react";

import axios from "axios";
import "../styles/addComp.css";

import { toast } from "react-toastify";
import SpinThree from "./SpinThree";
import { LiaTimesCircleSolid } from "react-icons/lia";

const AddComp = ({ handleShowAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    year: "",
    description: "",
  });

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsAdding(true);
      const response = await axios.post(
        "https://mickiesapp.onrender.com/book",
        formData
      );
      setIsAdding(false);

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

      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  if (isAdding) {
    return (
      <div className="adding">
        <SpinThree />
      </div>
    );
  }
  return (
    <div
      className="form-container"
      onClick={(event) => event.stopPropagation()}
    >
      <h2>Add a book</h2>
      <LiaTimesCircleSolid
        className="add-times"
        onClick={() => handleShowAdd()}
      />

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Titani"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Book Author</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder=" Jack"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            name="isbn"
            id="isbn"
            placeholder="  143426-07876-990"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <input
            type="number"
            name="year"
            id="year"
            placeholder="  2021"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddComp;
