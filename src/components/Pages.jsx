import React from "react";
import { Link } from "react-router-dom";
const Pages = () => {
  return (
    <div className="pagesContainer">
      <Link to="/">Design</Link>
      <Link to="/activation">Activation</Link>
    </div>
  );
};

export default Pages;
