import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

// COMPONENTE RUTAS COMPARTIDAS
// Sistema de carpooling para reservar o publicar viajes
function RutasCompartidas({ onVolver }) {
  const navigate = useNavigate();
  // ESTADO - Gestión de datos de viajes compartidos
  const [viajes, setViajes] = useState([
    {
      conductor: "María González",
      desde: "Carcelén",
      hasta: "Universidad Católica",
      fecha: "08 Ago",
      hora: "07:30",
      asientos: 3,
      precio: "$2.50",
      tipo: "compartir",
      auto: "Chevrolet Aveo Blanco",
      telefono: "0998765432"
    },
    {
      conductor: "Carlos Pérez",
      desde: "El Triángulo",
      hasta: "Centro Histórico", 
      fecha: "08 Ago",
      hora: "08:00",
      asientos: 2,
      precio: "$3.00",
      tipo: "compartir",
      auto: "Toyota Corolla Gris",
      telefono: "0987654321"
    },
    {
      conductor: "Ana Rodríguez",
      desde: "Quito Norte",
      hasta: "Valle de los Chillos",
      fecha: "09 Ago", 
      hora: "17:00",
      asientos: 1,
      precio: "$4.00",
      tipo: "buscar",
      descripcion: "Busco aventón para regresar del trabajo"
    }
  ]);

  const [tipoVista, setTipoVista] = useState("todos"); // Estados: "todos", "compartir", "buscar"
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Ir al formulario de reserva, pasando los datos del viaje por estado
  const handleReservar = (viaje) => {
    navigate('/reserva', { state: { viaje } });
  };

  // FUNCIONALIDAD - Sistema de filtrado de viajes
  const viajesFiltrados = tipoVista === "todos" 
    ? viajes 
    : viajes.filter(viaje => viaje.tipo === tipoVista);

  return (
    <div className="rutas-compartidas-container">
      {/* ENCABEZADO - Título de la sección */}
      <div className="encabezado-compartidas">
        <h2>🚗 Viajes Compartidos</h2>
        <p>Comparte tu auto o encuentra aventón</p>
      </div>

      {/* FILTROS - Selector de tipo de viaje */}
      <div className="filtros-viajes">
        <button 
          className={`filtro-viaje ${tipoVista === "todos" ? "activo" : ""}`}
          onClick={() => setTipoVista("todos")}
        >
          Todos
        </button>
        <button 
          className={`filtro-viaje ${tipoVista === "compartir" ? "activo" : ""}`}
          onClick={() => setTipoVista("compartir")}
        >
          🚗 Ofrezco Auto
        </button>
        <button 
          className={`filtro-viaje ${tipoVista === "buscar" ? "activo" : ""}`}
          onClick={() => setTipoVista("buscar")}
        >
          🙋 Busco Aventón
        </button>
      </div>

      {/* LISTA DE VIAJES - Renderizado dinámico */}
      <div className="lista-viajes">
        {viajesFiltrados.map((viaje, index) => (
          <div key={index} className="tarjeta-viaje">
            {/* Información del conductor */}
            <div className="viaje-header">
              <div className="conductor-info">
                <span className="conductor-nombre">👤 {viaje.conductor}</span>
                <span className={`tipo-badge ${viaje.tipo}`}>
                  {viaje.tipo === "compartir" ? "🚗 Ofrezco" : "🙋 Busco"}
                </span>
              </div>
              <div className="viaje-precio">{viaje.precio}</div>
            </div>

            {/* Información de la ruta */}
            <div className="ruta-viaje">
              <div className="punto-ruta">
                <span className="icono-desde">🔴</span>
                <div className="info-punto">
                  <strong>DESDE</strong>
                  <div className="lugar">{viaje.desde}</div>
                </div>
              </div>
              <div className="punto-ruta">
                <span className="icono-hasta">🟢</span>
                <div className="info-punto">
                  <strong>HASTA</strong>
                  <div className="lugar">{viaje.hasta}</div>
                </div>
              </div>
            </div>

            {/* Detalles del viaje */}
            <div className="viaje-detalles">
              <div className="detalle-item">
                <span>📅</span> {viaje.fecha} - {viaje.hora}
              </div>
              {viaje.asientos && (
                <div className="detalle-item">
                  <span>👥</span> {viaje.asientos} asientos disponibles
                </div>
              )}
              {viaje.auto && (
                <div className="detalle-item">
                  <span>🚙</span> {viaje.auto}
                </div>
              )}
              {viaje.descripcion && (
                <div className="descripcion-viaje">{viaje.descripcion}</div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="viaje-acciones">
              <button className="btn-contactar">
                📞 Contactar
              </button>
              <button
                className="btn-reservar"
                onClick={() => viaje.tipo === 'compartir' ? handleReservar(viaje) : alert('Responder a solicitud próximamente')}
              >
                {viaje.tipo === "compartir" ? "✅ Reservar" : "💬 Responder"}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navegación de regreso */}
      <div className="contenedor-volver">
        <button className="btn-volver" onClick={onVolver}>
          ← Volver
        </button>
      </div>
    </div>
  );
}

export default RutasCompartidas
