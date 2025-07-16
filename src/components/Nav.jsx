import React from "react";
import Logo from "../images/logo.png?url";
import { useNavigate } from "react-router-dom";
import PublishButton from "./PublishButton";
import Pages from "./Pages";
const Nav = () => {
  const navigate = useNavigate();

  const redirectPage = () => {
    navigate("/");
  };

  return (
    <div className="nav">
      <div className="navWrapper" onClick={redirectPage}>
        <img src={Logo} alt="site-logo" />
        <h3>PopUp Platform</h3>
      </div>
      <Pages />
      <PublishButton />
    </div>
  );
};

export default Nav;
