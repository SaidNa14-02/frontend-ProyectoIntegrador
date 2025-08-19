import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink,Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


// #region Dropdown
export const DropLinks= ({ setOpenProfile })=>{
  const navigate = useNavigate();
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenProfile]);

  const cerrarSesion = () => {
    // 1. Eliminar token del localStorage
    localStorage.removeItem('auth');
    
    // 2. Redirigir a login
    navigate('/login');
    
    // 3. Opcional: Mostrar notificación
    toast.success('Sesión cerrada correctamente');
    
    // 4. Cerrar el dropdown
    setOpenProfile(false);
  };

  return(
    <div className="perfil-dropdown-wrapper" ref={dropdownRef}>
      <div className="perfil-dropdown">
        <ul className="elementos_perfil">
          <li><Link to="/profile">Ver perfil</Link></li>
          <li><Link to="#">Historial de viajes</Link></li>
          <li><Link to="#">Historial de rutas</Link></li>
          <li><button onClick={cerrarSesion}> Cerrar  Sesion</button></li>
        </ul>
      </div>
    </div>
  );
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

