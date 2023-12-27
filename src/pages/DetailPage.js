import React, { useEffect, useState } from "react";
import "../styles/detailPage.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { LiaTimesCircleSolid } from "react-icons/lia";

import SpinTwo from "../components/SpinTwo";
import SpinThree from "../components/SpinThree";
import { toast } from "react-toastify";

const DetailPage = ({ token }) => {
  const navigate = useNavigate();
  const [book, setBook] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getBook = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://mickiesapp.onrender.com/book/" + id
        );
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    getBook();
  }, [id]);

  const toggleShowUpdate = () => {
    setShowUpdate(!showUpdate);
  };

  const toggleDelete = () => {
    setShowDelete(!showDelete);
  };

  const handleChange = (event) => {
    setBook((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (token) {
      try {
        setUpdating(true);
        const response = await axios.put(
          "https://mickiesapp.onrender.com/book/update/" + id,
          book
        );
        setUpdating(false);
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
        backWards();
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const backWards = () => {
    navigate("/");
  };

  const handleDeleAction = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        "https://mickiesapp.onrender.com/book/delete/" + id
      );
      setIsDeleting(false);
      if (token) {
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
      }
      backWards();
    } catch (error) {
      console.error(error.message);
    }
  };
  if (loading) {
    return (
      <div className="loading">
        <SpinTwo />
      </div>
    );
  }
  if (isDeleting) {
    return (
      <div className="deleting">
        <SpinTwo />
      </div>
    );
  }

  if (updating) {
    return (
      <div className="updating">
        <SpinThree />
      </div>
    );
  }

  const Offline = () => {
    toast.warning("Login to update");
    return;
  };

  const offlineDelete = () => {
    toast.warning("Login to delete this");
  };

  return (
    <div className="detail">
      <div className="info">
        <Link to={"/"} style={{ color: "black" }}>
          <FaArrowLeft
            size={30}
            style={{
              position: "absolute",
              left: "1rem",
              textDecoration: "none",
            }}
          />
        </Link>
        <h2>{book.title}</h2>
        <h3>
          {" "}
          <span>Author</span>
          {book.author}
        </h3>
        <h5>
          <span>ISBN:</span>
          {book.isbn}
        </h5>
        <h6>
          {" "}
          <span>Year</span>
          {book.year}
        </h6>
        <p>
          <span>Summary</span>
          {book.description}
        </p>
        <div className="buttons">
          <button onClick={toggleShowUpdate}>update</button>
          <button onClick={toggleDelete}>Delete</button>
        </div>
      </div>
      {showUpdate && (
        <div className="update" onClick={toggleShowUpdate}>
          <div
            className="form-container"
            onClick={(event) => event.stopPropagation()}
          >
            <h2>Edit your book</h2>
            <FaTimes
              style={{
                position: "absolute",
                right: 0,
                paddingRight: "1rem",
                top: 0,
                fontSize: "25px",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={toggleShowUpdate}
              id="times"
            />
            <form onSubmit={handleEditSubmit}>
              <div>
                <label htmlFor="title">Book Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={book.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="author">Book Author</label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={book.author}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="isbn">ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  id="isbn"
                  value={book.isbn}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  value={book.year}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={book.description}
                  onChange={handleChange}
                />
              </div>
              {token ? (
                <button type="submit">Update</button>
              ) : (
                <button
                  onClick={() => {
                    Offline();
                  }}
                >
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      )}
      {showDelete && (
        <div className="delete-modal">
          <LiaTimesCircleSolid
            size={23}
            style={{ position: "absolute", right: 0, marginRight: "8px" }}
            onClick={toggleDelete}
          />
          <p> Are you sure you want to delete this book?</p>
          <div className="btns">
            {token ? (
              <button id="yes" onClick={handleDeleAction}>
                yes
              </button>
            ) : (
              <button id="yes" onClick={offlineDelete}>
                yes
              </button>
            )}
            <button id="no" onClick={toggleDelete}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
