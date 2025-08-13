import { useState } from 'react'
import './App.css'
import CrearRuta from './CrearRuta'
import RutasCompartidas from './RutasCompartidas'
import { useNavigate } from "react-router-dom";


// CONFIGURACIÓN - Colores para tarjetas estilo post-it
const coloresPostIt = [
  "#fff9c4", // amarillo claro
  "#b3e5fc", // celeste claro
  "#c8e6c9", // verde claro
  "#ffe0b2", // naranja claro
  "#f8bbd0", // rosa claro
  "#d1c4e9", // lila claro
];

// COMPONENTE PRINCIPAL - App
function App() {
  const navigate = useNavigate();
  // ESTADO - Gestión de rutas y navegación
  const [pins, setPins] = useState([
    {
      titulo: "Ruta segura Carcelen - U Catolica",
      desde: "Carcelen bajo",
      hasta: "Universidad Católica",
      descripcion: "Tomar el bus S1 - El Triángulo en la Av. Ilaló, frente al parque El Triángulo. Viajar hasta la estación...",
      transporte: "Bus",
      fecha: "Jul 04",
      favorito: true
    },
    {
      titulo: "Ruta segura desde El Triángulo a la U Catolica en bus",
      desde: "El Triángulo, Av. Ilaló",
      hasta: "Universidad Católica PUC",
      descripcion: "Tomar el bus S1 - El Triángulo en la Av. Ilaló, frente al parque El Triángulo. Viajar hasta la estación...",
      transporte: "Bus",
      fecha: "Jul 03",
      favorito: false
    },
    {
      titulo: "Ruta segura Quito Norte - Centro",
      desde: "Quito Norte",
      hasta: "Centro Histórico",
      descripcion: "Ruta recomendada para viajar desde el norte de Quito hacia el centro histórico de la ciudad.",
      transporte: "Auto",
      fecha: "Jul 02",
      favorito: true
    },
    {
      titulo: "Ruta segura Valle de los Chillos - Quito",
      desde: "Valle de los Chillos",
      hasta: "Quito Centro",
      descripcion: "gijudwaguidwagiudaw",
      transporte: "Bus",
      fecha: "Jul 01",
      favorito: false
    }
  ]);
  const [pestana, setPestana] = useState("index"); // Control de navegación: "index", "agregar", "compartidas"
  const [filtroActivo, setFiltroActivo] = useState("Todos"); // Control de filtros activos
  const [openProfile, setOpenProfile] = useState(false); // Control del dropdown de perfil

  // FUNCIONALIDAD - Sistema de filtrado por tipo de transporte
  const rutasFiltradas = filtroActivo === "Todos" 
    ? pins 
    : pins.filter(pin => pin.transporte === filtroActivo);

  // FUNCIONALIDAD - Gestión de rutas
  const agregarNuevaRuta = (nuevaRuta) => {
    setPins([nuevaRuta, ...pins]); // Agregar al inicio
    setPestana("index"); // Volver a la página principal
  };

  const cancelarCreacion = () => {
    setPestana("index");
  };

  // FUNCIONALIDAD - Logout
  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };
  return (
    <div className="app-container">
      {/* NAVEGACIÓN - Barra superior responsive */}
      <nav className="navbar">
        <div className="nav-logo">
          <span role="img" aria-label="pin">📌</span>
          Pinboard Rutas Seguras
        </div>
        <div className="nav-links">
          <button 
            className="nav-link"
            onClick={() => setPestana("index")}
          >
            <span role="img" aria-label="casa">🏠</span>
            Inicio
          </button>
          <button 
            className="nav-link"
            onClick={() => alert("Funcionalidad en desarrollo")}
          >
            <span role="img" aria-label="mapa">🗺️</span>
            Mis Rutas
          </button>
          <button 
            className="nav-link"
            onClick={() => setPestana("compartidas")}
          >
            <span role="img" aria-label="mundo">🌍</span>
            Viajes Compartidos
          </button>
          <button
            className="nav-link"
            onClick={() => setPestana("agregar")}>
              <span role="img" aria-label="agregar">➕</span>
               Agregar Ruta
          </button>
          <button 
            className="nav-link"
            onClick={() => setOpenProfile((prev)=>!prev)}
          >
            <span role="img" aria-label="perfil">👤</span>
            Perfil
          </button>
          
          {/* Dropdown de perfil */}
          {openProfile && (
            <div className="profile-dropdown" style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              zIndex: 1000
            }}>
              <button 
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  color: '#ff4444'
                }}
              >
                <span role="img" aria-label="logout">🚪</span>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="pinboard-container">
        {/* ENCABEZADO - Banner principal */}
        <div className="banner-principal">
          <span role="img" aria-label="mapa">🗺️</span>
          Tablero de Rutas Seguras
        </div>
        <p className="subtitulo">Descubre las mejores rutas compartidas por nuestra comunidad</p>
        
        {/* PÁGINA PRINCIPAL - Lista de rutas */}
        {pestana === "index" && (
          <>
            {/* FILTROS - Sistema de filtrado por transporte */}
            <div className="barra-estado">
              <div className="estado-izquierda">
                <span className="etiqueta-estado">{rutasFiltradas.length} rutas disponibles</span>
                <span className="etiqueta-estado">Actualizado recientemente</span>
              </div>
              
              {/* Botones de filtro */}
              <div className="filtros-simples">
                <button 
                  className={`filtro-simple ${filtroActivo === "Todos" ? "activo" : ""}`}
                  onClick={() => setFiltroActivo("Todos")}
                >
                  Todos
                </button>
                <button 
                  className={`filtro-simple ${filtroActivo === "Bus" ? "activo" : ""}`}
                  onClick={() => setFiltroActivo("Bus")}
                >
                  🚌 Bus
                </button>
                <button 
                  className={`filtro-simple ${filtroActivo === "Auto" ? "activo" : ""}`}
                  onClick={() => setFiltroActivo("Auto")}
                >
                  🚗 Auto
                </button>
              </div>
            </div>

            {/* Tarjetas de rutas estilo post-it */}
            <ul className="pinboard-list">
              {rutasFiltradas.map((pin, index) => (
                <li
                  key={index}
                  className="tarjeta-ruta"
                  style={{
                    background: coloresPostIt[index % coloresPostIt.length],
                    color: "#222",
                  }}
                >
                  <div className="tarjeta-header">
                    <h3 className="tarjeta-titulo">{pin.titulo}</h3>
                    <span className="icono-info" role="img" aria-label="información">ℹ️</span>
                  </div>
                  
                  <div className="info-ruta">
                    <div className="ruta-item">
                      <span className="icono-desde" role="img" aria-label="desde">🔴</span>
                      <div>
                        <strong>DESDE</strong>
                        <div>{pin.desde}</div>
                      </div>
                    </div>
                    <div className="ruta-item">
                      <span className="icono-hasta" role="img" aria-label="hasta">🟢</span>
                      <div>
                        <strong>HASTA</strong>
                        <div>{pin.hasta}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="tarjeta-descripcion">{pin.descripcion}</div>
                  
                  <div className="tarjeta-footer">
                    <div className="info-transporte">
                      <span className="icono-transporte" role="img" aria-label={pin.transporte}>
                        {pin.transporte === "Bus" ? "🚌" : "🚗"}
                      </span>
                      {pin.transporte} • {pin.fecha}
                    </div>
                    <div className="tarjeta-botones">
                      <button className="btn-detalles">
                        <span role="img" aria-label="ver">👁️</span>
                        Ver Detalles
                      </button>
                      <span className="icono-favorito" role="img" aria-label="favorito">
                        {pin.favorito ? "⭐" : "☆"}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Botón para agregar nueva ruta */}
            <div className="seccion-compartir">
              <div className="compartir-contenido">
                <span role="img" aria-label="pregunta">❓</span>
                <span>¿Conoces una ruta que no está aquí?</span>
                <br />
                <br />
                <button 
                  className="btn-compartir"
                  onClick={() => setPestana("agregar")}
                >
                  <span role="img" aria-label="agregar">➕</span>
                  + Compartir Nueva Ruta
                </button>
              </div>
            </div>
          </>
        )}

        {/* FORMULARIO - Crear nueva ruta */}
        {pestana === "agregar" && (
          <CrearRuta 
            onAgregarRuta={agregarNuevaRuta}
            onCancelar={cancelarCreacion}
          />
        )}

        {/* VIAJES COMPARTIDOS - Nueva página */}
        {pestana === "compartidas" && (
          <RutasCompartidas 
            onVolver={() => setPestana("index")}
          />
        )}
      </div>
      
      {/* FOOTER */}
      <footer className="footer">
        ©2025 Pinboard Rutas Seguras - Movilidad sostenible y segura
      </footer>
    </div>
  );
}

export default App