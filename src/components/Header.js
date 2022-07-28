import React from 'react';
import logo from "../images/places-logo.png";

const Header = ({ children }) => {
  return (
    <header className="header">
      <a className="logo" href="">
        <img className="logo__image" src={logo} alt="Spaces Logo" />
      </a>
      <nav className="header__nav">{children}</nav>
    </header>
  );
};

export default Header;
