/* import React, { useState } from "react";
import axios from "axios";

function BookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    publishedYear: "",
    coverImageURL: "",
    language: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addBook = (newBookData) => {
    axios
      .post("http://localhost:3000/books", newBookData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Book added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text" name="title" value={formData.title} onChange={handleInputChange}/>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
        />
        Genre:
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
        />
        Description
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        Published Year:
        <input
          type="text"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleInputChange}
        />
        CoverImageURL:
        <input
          type="text"
          name="CoverImageURL"
          value={formData.coverImageURL}
          onChange={handleInputChange}
        />
        Language:
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleInputChange}/>
      </label>
      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;
 */