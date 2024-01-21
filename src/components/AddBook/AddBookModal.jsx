import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AddBookModal.css';

const AddBookModal = ({ isOpen, onClose }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    publishedYear: '',
    genre: '',
    isbn:'',
    description: '',
    coverImageURL:'',
    language: '',
    readStatus: '',
    userRating: '',
    numberOfPages:'',
    readingTime: '',
    tags:'',
    format:'',
    dateAdded: '',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = () => {
    axios
      .post('http://localhost:3000/books', newBook, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Book added successfully:', response.data);
        onClose();
      })
      .catch((error) => {
        console.error('Error adding book:', error);
      });
  };
  const modalStyles = {
    content: {
      position: 'absolute',
    inset: '40px',
    border: '1px solid rgb(204, 204, 204)',
    background: 'rgb(255, 255, 255)',
    overflow: 'auto',
    bordeRadius: '4px',
    outline: 'none',
    padding: '20px',
    height: '500px',
    width: '300px'
    },
  };



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Add Book Modal"
      style={modalStyles}
    >
      <h2>Fill in the book detials</h2>
      <form className='modal-form'>
      <div>
         
          <input
            type="text"
            placeholder="Book Tiltle" className="input input-bordered w-full max-w-xs"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
          />
         
        </div>
        <div>
         
          <input
            type="text"
            placeholder="Author" className="input input-bordered w-full max-w-xs"
            name="author"
            value={newBook.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
         
          <input
            type="text"
            placeholder="Year published" className="input input-bordered w-full max-w-xs"
            name="publishedYear"
            value={newBook.publishedYear}
            onChange={handleInputChange}
          />
        </div>
        <div>
          
          <input
            type="text"
            placeholder="Genres" className="input input-bordered w-full max-w-xs"
            name="genres"
            value={newBook.genre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          
          <input
            type="text"
            placeholder="ISBN" className="input input-bordered w-full max-w-xs"
            name="isbn"
            value={newBook.isbn}
            onChange={handleInputChange}
          />
        </div>
        <div>
         
        {/*   <textarea
            name="description"
            value={newBook.description}
            onChange={handleInputChange}
          /> */}
          <textarea placeholder="write a book description..."
          name="description" 
          value={newBook.description}
          onChange={handleInputChange}className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
        </div>
        <div>
          
          <input
            type="text"
            placeholder="Book Cover URL" className="input input-bordered w-full max-w-xs"
            name="coverImageURL"
            value={newBook.coverImageURL}
            onChange={handleInputChange}
          />
        </div>
        <div>
          
          <input
            type="text"
            placeholder="language" className="input input-bordered w-full max-w-xs"
            name="language"
            value={newBook.language}
            onChange={handleInputChange}
          />
        </div>

        <div>
          
          <input
            type="text"
            placeholder="readStatus" className="input input-bordered w-full max-w-xs"
            name="readStatus"
            value={newBook.readStatus}
            onChange={handleInputChange}
          />
        </div>

        <div>
          
          <input
            type="text"
            placeholder="userRating" className="input input-bordered w-full max-w-xs"
            name="userRating"
            value={newBook.userRating}
            onChange={handleInputChange}
          />
        </div>

        <div>
          
          <input
            type="text"
            placeholder="numberOfPages" className="input input-bordered w-full max-w-xs"
            name="numberOfPages"
            value={newBook.numberOfPages}
            onChange={handleInputChange}
          />
        </div>

        <div>
          
          <input
            type="text"
            placeholder="readingTime" className="input input-bordered w-full max-w-xs"
            name="readingTime"
            value={newBook.readingTime}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="tags" className="input input-bordered w-full max-w-xs"
            name="tags"
            value={newBook.tags}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="format" className="input input-bordered w-full max-w-xs"
            name="format"
            value={newBook.format}
            onChange={handleInputChange}
          />
        </div>

        <div>
          
          <input
            type="date"
            placeholder="dateAdded" className="input input-bordered w-full max-w-xs"
            name="dateAdded"
            value={newBook.dateAdded}
            onChange={handleInputChange}
          />
        </div>

        <div>
          
          <input
            type="date"
            placeholder="startDate" className="input input-bordered w-full max-w-xs"
            name="startDate"
            value={newBook.startDate}
            onChange={handleInputChange}
          />
        </div>

        <div>
          
          <input
            type="text"
            placeholder="endDate" className="input input-bordered w-full max-w-xs"
            name="endDate"
            value={newBook.endDate}
            onChange={handleInputChange}
          />
        </div>

        <div>
          
          <input
            type="text"
            placeholder="language" className="input input-bordered w-full max-w-xs"
            name="language"
            value={newBook.language}
            onChange={handleInputChange}
          />
        </div>
        <div className='modal-buttons'>
        <button type="button" onClick={handleAddBook}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBookModal;

