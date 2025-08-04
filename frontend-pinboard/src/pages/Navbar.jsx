import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import '../styles/Navbar.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      {open && (
        <div className="dropdown">
          <a href="/">Home</a>
          <a href="/features">Features</a>
          <a href="/about">About</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
