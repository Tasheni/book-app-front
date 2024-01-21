import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BookDetail.css";
import { StarRating } from "../StarRating/StarRating";

const BookDetail = () => {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const formatDate = (date) =>
    new Date(date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  useEffect(() => {
    console.log("Fetching book details by title", title);

    axios
      .get(`http://localhost:3000/books/title?title=${title}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => console.error("Error fetching book details:", error));
  }, [title]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-detail-grid">
      <div className="book-cover">
        <img src={book.coverImageURL} alt={book.title} />
        {book.readStatus}
      </div>
      <div className="book-metadata">
        <div className="book-header">
          <h1>{book.title}</h1>
          {book.readStatus && <span className="badge">{book.readStatus}</span>}
        </div>
        <h2>Author: {book.author}</h2>
        {book.startDate && book.endDate && (
          <div className="reading-period">
            {formatDate(book.startDate)} - {formatDate(book.endDate)}
          </div>
        )}
        {book.readStatus === "Read" && <StarRating rating={book.userRating} />}

        <div className="book-section">
          <div className="book-detail-accordion">
            <div className="collapse collapse-plus bg-base-200 border-2 border-gray-300">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Description
              </div>
              <div className="collapse-content">
                <p>{book.description}</p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200 border-2 border-gray-400">
              <input type="checkbox" />
              <div className="first-collapse collapse-title text-xl font-medium p-4">
                Favorite Quotes
              </div>
              <div className="collapse-content">
                <ul>
                  {book.quotes.map((quote, index) => (
                    <li key={index}>{quote}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200 border-2 border-gray-300">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">Details</div>
              <div className="collapse-content">
                <p>ISBN: {book.isbn}</p>
                <p>Number of pages: {book.numberOfPages}</p>
                <p>Language: {book.language}</p>
              </div>
            </div>
          </div>
          <div className="book-tags">
            {book.tags.split(", ").map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookDetail;
