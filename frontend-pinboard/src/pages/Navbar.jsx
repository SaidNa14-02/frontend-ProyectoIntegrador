import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <nav className="navbar">
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <div className={`dropdown ${open ? 'show' : ''}`}>
        <NavLink to="/" end onClick={handleClose}>
          Home
        </NavLink>
        <NavLink to="/about" onClick={handleClose}>
          About
        </NavLink>
        <NavLink to="/contact" onClick={handleClose}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
