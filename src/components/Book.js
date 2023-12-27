import React from "react";
import "../styles/Book.css";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
  const { title, author, id } = book;
  return (
    <div className="card">
      <h2>{title}</h2>
      <h3>{author}</h3>
      <Link to={`/${id}`}>Click for details</Link>
    </div>
  );
};

export default Book;
