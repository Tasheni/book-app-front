import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../Login/LoginModal.css';

const LoginModal = ({ isOpen, onClose, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    const endpoint = isRegistering ? 'register' : 'login';

    axios
      .post(`http://localhost:3000/users/${endpoint}`, { email, password })
      .then((response) => {
        console.log('Logged in/registered successfully:', response.data);
        onClose();
      })
      .catch((error) => {
        console.error('Login/registration failed:', error);
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
    <div className={`login-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        <form>
        <input

          type="text"
          className='input-login'
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>{isRegistering ? 'Register' : 'Login'}</button>
        <p>
          {isRegistering
            ? 'Already have an account?'
            : 'Don\'t have an account yet?'}
        </p>
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
        <button onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
    </Modal>
  );
};

export default LoginModal;

