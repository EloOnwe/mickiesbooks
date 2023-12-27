import React, { useEffect, useState } from "react";
import "../styles/home.css";
import axios from "axios";
import Book from "../components/Book";
import SpinOne from "../components/SpinOne";

const Home = () => {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBooks();
  }, []);
  const getBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://mickiesapp.onrender.com/");
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <SpinOne />
      </div>
    );
  }
  return (
    <div className="home">
      <div className="card-cont">
        {books?.map((book) => {
          return <Book book={book} key={book.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
