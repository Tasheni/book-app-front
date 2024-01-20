import React from 'react'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import BookDetail from './components/BookDetail/BookDetail.jsx';
import BookList from './components/BookList/BookList.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Charts from './components/Chart/Charts.jsx'


const root = document.getElementById('root');
const reactRoot = createRoot(root);


reactRoot.render(
  <React.StrictMode>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bookList" element={<BookList/>}/>
        <Route path="/book/:title" element={<BookDetail />}  />
        <Route path="/charts" element={<Charts />}  />
        <Route path="/books" element={<BookList />} />


      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>,
);
