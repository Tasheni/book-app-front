import React from 'react';
import Modal from 'react-modal';

const DeleteModal = ({ isOpen, onClose, onDelete, bookTitle }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Book Modal"
    >
      <h2>Delete Book</h2>
      <p>Are you sure you want to delete "{bookTitle}"?</p>
      <button onClick={onDelete}>Yes, Delete</button>
      <button onClick={onClose}>Exit</button>
    </Modal>
  );
};

export default DeleteModal;
