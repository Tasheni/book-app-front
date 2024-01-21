import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BookList.css";
import DeleteModal from "../DeleteBook/DeleteModal";
import { StarRating } from "../StarRating/StarRating";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editingStatus, setEditingStatus] = useState({
    bookId: null,
    status: "",
  });
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const handleToggleEditing = (bookId) => {
    console.log("Toggling editing for bookId:", bookId);
    setEditingStatus((prevStatus) =>
      prevStatus && prevStatus.bookId === bookId ? null : { bookId, status: "" }
    );
  };

  const handleStatusChange = async (e, bookId) => {
    e.preventDefault();

    console.log(
      "Handling status change for bookId:",
      bookId,
      "newStatus:",
      editingStatus.status
    );

    try {
      await axios.put(
        `http://localhost:3000/books/${bookId}/update-read-status`,
        {
          readStatus: editingStatus.status,
        }
      );

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId
            ? { ...book, readStatus: editingStatus.status }
            : book
        )
      );
    } catch (error) {
      console.error("Error updating read status:", error);
    } finally {
      setEditingStatus(null);
    }
  };

  const openDeleteModal = (book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setBookToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleSearch = () => {
    axios
      .get(
        `http://localhost:3000/books/search?term=${searchTerm}&genre=${selectedGenre}`
      )
      .then((response) => {
        console.log(response.data);
        setSearchResults(response.data);
      })
      .catch((error) => console.error("Error searching books:", error));
  };

  useEffect(() => {
    console.log("Fetching books...");
    if (!loading) {
      setLoading(true);
    }

    const fetchBooks = searchTerm
      ? axios.get(`http://localhost:3000/books/search?term=${searchTerm}`)
      : axios.get("http://localhost:3000/books/getAll");

    fetchBooks
      .then((response) => {
        setBooks(response.data);
        console.log("Books fetched:", response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, [searchTerm]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:3000/books/genres");
        const genresFromBooks = response.data.flatMap((genre) =>
          genre.split(", ")
        );
        const uniqueGenres = [...new Set(genresFromBooks)];

        setGenres(uniqueGenres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div>
      <div className="book-list-header">
        <h1>Book List</h1>
      </div>
      <div className="join">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <select
          className="select select-bordered join-item"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="" disabled>
            Select a genre
          </option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <div className="search-button">
          <button onClick={handleSearch} className="btn join-item">
            Search
          </button>
        </div>
      </div>
      <div className="grid-container">
        {(searchTerm || selectedGenre ? searchResults : books).map((book) => (
          <>
            <div key={book._id} className="book-item">
              <div className="icon-container">
                <button
                  className="delete-button"
                  onClick={() => openDeleteModal(book)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  className="favorite-button"
                  onClick={() => handleAddToFavorites(book._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>
              </div>
              <div className="book-cover-container">
                <Link to={`/book/${book.title}`}>
                  <img
                    src={book.coverImageURL}
                    alt="Book Cover"
                    className="book-cover"
                  />
                </Link>
              </div>

              <div className="book-info">
                <p className="book-author">{book.author}</p>
                <h2 className="book-title">{book.title}</h2>
                {book.readStatus === "Read" && (
                  <StarRating rating={book.userRating} />
                )}
                {editingStatus && editingStatus.bookId === book._id ? (
                  <form onSubmit={(e) => handleStatusChange(e, book._id)}>
                    <label>
                      Edit Read Status:
                      <select
                        value={editingStatus.status || book.readStatus}
                        onChange={(e) =>
                          setEditingStatus({
                            ...editingStatus,
                            status: e.target.value,
                          })
                        }
                      >
                        <option disabled selected>
                          Change book read status
                        </option>
                        <option value="To Read">To Read</option>
                        <option value="Currently Reading">
                          Currently Reading
                        </option>
                        <option value="Read">Read</option>
                      </select>
                    </label>
                    <div className="button-container">
                      <button
                        className="save-button btn btn-circle btn-outline btn-xs"
                        type="submit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </button>

                      <button
                        className="cancel-button btn btn-circle btn-outline btn-xs"
                        type="button"
                        onClick={() => handleToggleEditing(null)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="book-read-status">
                      {book.readStatus && (
                        <span className="badge">
                          {book.readStatus}{" "}
                          <button
                            className="edit-read-status"
                            onClick={() => handleToggleEditing(book._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              class="w-4 h-4"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      )}
                    </p>
                  </>
                )}
              </div>
            </div>
          </>
        ))}
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={() => deleteBook(bookToDelete?._id)}
        bookTitle={bookToDelete?.title}
      />
    </div>
  );
};

export default BookList;
