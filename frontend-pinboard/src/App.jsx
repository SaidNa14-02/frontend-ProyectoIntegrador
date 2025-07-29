import { useState } from 'react'
import './App.css'

const coloresPostIt = [
  "#fff9c4", // amarillo claro
  "#b3e5fc", // celeste claro
  "#c8e6c9", // verde claro
  "#ffe0b2", // naranja claro
  "#f8bbd0", // rosa claro
  "#d1c4e9", // lila claro
];

function App() {
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
  const [nuevoPin, setNuevoPin] = useState({ titulo: '', desde: '', hasta: '', descripcion: '', transporte: 'Bus' });
  const [pestana, setPestana] = useState("inicio"); // "inicio" o "agregar"

  const agregarPin = (e) => {
    e.preventDefault();
    if (
      !nuevoPin.titulo.trim() ||
      !nuevoPin.desde.trim() ||
      !nuevoPin.hasta.trim() ||
      !nuevoPin.descripcion.trim()
    ) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    setPins([nuevoPin, ...pins]); // Agregar al inicio
    setNuevoPin({ titulo: '', desde: '', hasta: '', descripcion: '', transporte: 'Bus' });
    setPestana("inicio");
    alert('Ruta creada exitosamente!');
  };

  return (
    <div className="app-container">
      {/* Barra de navegación superior */}
      <nav className="navbar">
        <div className="nav-logo">
          <span role="img" aria-label="pin">📌</span>
          Pinboard Rutas Seguras
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link">
            <span role="img" aria-label="casa">🏠</span>
            Inicio
          </a>
          <a href="#" className="nav-link">
            <span role="img" aria-label="mapa">🗺️</span>
            Mis Rutas
          </a>
          <a href="#" className="nav-link">
            <span role="img" aria-label="agregar">➕</span>
            + Agregar Ruta
          </a>
          <a href="#" className="nav-link">
            <span role="img" aria-label="perfil">👤</span>
            Perfil
          </a>
        </div>
      </nav>

      <div className="pinboard-container">
        {/* Banner principal */}
        <div className="banner-principal">
          <span role="img" aria-label="mapa">🗺️</span>
          Tablero de Rutas Seguras
        </div>
        <p className="subtitulo">Descubre las mejores rutas compartidas por nuestra comunidad</p>
        
        {/* Barra de estado y filtros */}
        <div className="barra-estado">
          <div className="estado-izquierda">
            <span className="etiqueta-estado">{pins.length} rutas disponibles</span>
            <span className="etiqueta-estado">Actualizado recientemente</span>
          </div>
          <button className="btn-filtrar">
            ▼ Filtrar
          </button>
        </div>
        
        {pestana === "inicio" && (
          <>
            <ul className="pinboard-list">
              {pins.map((pin, index) => (
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
            
            {/* Sección de compartir nueva ruta */}
            <div className="seccion-compartir">
              <div className="compartir-contenido">
                <span role="img" aria-label="pregunta">❓</span>
                <span>¿Conoces una ruta que no está aquí?</span>
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

        {pestana === "agregar" && (
          <form className="pinboard-form" onSubmit={agregarPin}>
            <input
              type="text"
              value={nuevoPin.titulo}
              onChange={e => setNuevoPin({ ...nuevoPin, titulo: e.target.value })}
              placeholder="Título de la ruta"
            />
            <input
              type="text"
              value={nuevoPin.desde}
              onChange={e => setNuevoPin({ ...nuevoPin, desde: e.target.value })}
              placeholder="Desde"
            />
            <input
              type="text"
              value={nuevoPin.hasta}
              onChange={e => setNuevoPin({ ...nuevoPin, hasta: e.target.value })}
              placeholder="Hasta"
            />
            <textarea
              value={nuevoPin.descripcion}
              onChange={e => setNuevoPin({ ...nuevoPin, descripcion: e.target.value })}
              placeholder="Descripción de la ruta"
              rows="4"
            />
            <select
              value={nuevoPin.transporte}
              onChange={e => setNuevoPin({ ...nuevoPin, transporte: e.target.value })}
            >
              <option value="Bus">Bus</option>
              <option value="Auto">Auto</option>
              <option value="Metro">Metro</option>
              <option value="Bici">Bici</option>
            </select>
            <button type="submit">Guardar Ruta</button>
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => setPestana("inicio")}
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
      
      {/* Footer */}
      <footer className="footer">
        ©2025 Pinboard Rutas Seguras - Movilidad sostenible y segura
      </footer>
    </div>
  );
}

export default App