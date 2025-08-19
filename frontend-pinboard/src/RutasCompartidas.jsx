import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import axiosInstance from './api/axiosInstance';
import { toast } from 'react-toastify';

function RutasCompartidas({ onVolver }) {
  const navigate = useNavigate();
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tipoVista, setTipoVista] = useState("todos");

  useEffect(() => {
    const fetchViajes = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/viajes');
        const mappedViajes = response.data.data.map(viaje => ({
          id: viaje.id,
          conductor: `${viaje.conductor_nombre} ${viaje.conductor_apellido}`,
          desde: viaje.origen,
          hasta: viaje.destino,
          fecha: new Date(viaje.fecha_hora_salida).toLocaleDateString('es-ES', { month: 'short', day: '2-digit' }),
          hora: new Date(viaje.fecha_hora_salida).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          asientos: viaje.asientos_ofrecidos,
          precio: "$X.XX",
          tipo: "compartir",
        }));
        setViajes(mappedViajes);
      } catch (err) {
        console.error('Error al obtener viajes compartidos:', err.response?.data || err.message);
        setError('Error al cargar los viajes.');
        toast.error('Error al cargar los viajes: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchViajes();
  }, []);

  const handleReservar = async (viaje) => {
    try {
      await axiosInstance.post('/api/reservas', { viajeId: viaje.id });
      toast.success('Reserva realizada con éxito!');
      navigate('/reserva', { state: { viaje } });
    } catch (err) {
      console.error('Error al realizar la reserva:', err.response?.data || err.message);
      toast.error('Error al realizar la reserva: ' + (err.response?.data?.message || err.message));
    }
  };

  const viajesFiltrados = tipoVista === "todos" 
    ? viajes 
    : viajes.filter(viaje => viaje.tipo === tipoVista);

  if (loading) {
    return <div className="rutas-compartidas-container">Cargando viajes...</div>;
  }

  if (error) {
    return <div className="rutas-compartidas-container">{error}</div>;
  }

  return (
    <div className="rutas-compartidas-container">
      <div className="encabezado-compartidas">
        <h2>🚗 Viajes Compartidos</h2>
        <p>Comparte tu auto o encuentra aventón</p>
      </div>

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

      <div className="lista-viajes">
        {viajesFiltrados.length === 0 ? (
          <p>No hay viajes disponibles en esta categoría.</p>
        ) : (
          viajesFiltrados.map((viaje) => (
            <div key={viaje.id} className="tarjeta-viaje">
              <div className="viaje-header">
                <div className="conductor-info">
                  <span className="conductor-nombre">👤 {viaje.conductor}</span>
                  <span className={`tipo-badge ${viaje.tipo}`}>
                    {viaje.tipo === "compartir" ? "🚗 Ofrezco" : "🙋 Busco"}
                  </span>
                </div>
                <div className="viaje-precio">{viaje.precio}</div>
              </div>

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

              <div className="viaje-detalles">
                <div className="detalle-item">
                  <span>📅</span> {viaje.fecha} - {viaje.hora}
                </div>
                {viaje.asientos && (
                  <div className="detalle-item">
                    <span>👥</span> {viaje.asientos} asientos disponibles
                  </div>
                )}
              </div>

              <div className="viaje-acciones">
                <button className="btn-contactar">
                  📞 Contactar
                </button>
                <button
                  className="btn-reservar"
                  onClick={() => handleReservar(viaje)}
                >
                  {viaje.tipo === "compartir" ? "✅ Reservar" : "💬 Responder"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="contenedor-volver">
        <button className="btn-volver" onClick={onVolver}>
          ← Volver
        </button>
      </div>
    </div>
  );
}

export default RutasCompartidas