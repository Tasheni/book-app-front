import React from "react";
import { Link } from "react-router-dom";
import "./App.css";


function App() {
  

  return (
    <>
    <div className="container">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <Link to={`/bookList`}>Book List</Link>
          <Link to={`/charts`}>Charts</Link>
        </ul>
      </nav>
    </div>
    
    </>
  );
}

export default App;


