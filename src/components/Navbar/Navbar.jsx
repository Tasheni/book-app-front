import React from 'react';
import './Navbar.css'; 
import AddBookModal from '../AddBook/AddBookModal';
import { useState} from "react";
import LoginModal from '../LogIn/LoginModal';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();


  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  return (
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li><button onClick={openModal}>Add Book</button></li>
        <li><button onClick={openLoginModal}>Login</button></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Tasheni Reads</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li><button onClick={openModal}>Add Book</button></li>
      <li><button onClick={openLoginModal}>Login</button></li>
    </ul>
  </div>
  <div className="navbar-end">
  <button onClick={() => navigate('/bookList')}>Books</button>
  <button onClick={() => navigate('/charts')}>Charts</button>
  </div>
  <AddBookModal isOpen={isModalOpen} onClose={closeModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
</div>
  );
};

export default Navbar;
