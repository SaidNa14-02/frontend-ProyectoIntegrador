import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
// #region Dropdown
export const DropLinks= ()=>{
    return(
        <div className="perfil_dropdown">
            <ul className="elementos_perfil">
                <li>Mi perfil</li>
                <li>Historial de viajes</li>
                <li>Historial de rutas</li>
            </ul>
        </div>
    )
}
//#endregion

// #region Navbar secundario
//Navbar es un secundario,Navbar principal conlleva toda la logica 
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
//#endregion
export default Navbar;

