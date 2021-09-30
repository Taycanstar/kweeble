import React from "react";
import "../../styles/auth.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <h1>404</h1>
      <h2>Page Not Found</h2>

      <a href="/">
        <button className="notfound-btn">Go home</button>
      </a>
    </div>
  );
};

export default NotFound;
