import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const MisRutas = ({ onVolver, onCrear }) => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyRutas = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/rutas/me');
        const mappedRutas = response.data.data.map(ruta => ({
          id: ruta.id,
          titulo: ruta.titulo,
          descripcion: ruta.descripcion,
          desde: ruta.punto_inicio,
          hasta: ruta.punto_destino,
          transporte: ruta.tipo_transporte,
          fecha: new Date(ruta.created_at || Date.now()).toLocaleDateString('es-ES', { month: 'short', day: '2-digit' }),
          favorito: false,
          own: true,
        }));
        setRutas(mappedRutas);
      } catch (err) {
        console.error('Error al obtener mis rutas:', err.response?.data || err.message);
        setError('Error al cargar tus rutas.');
        toast.error('Error al cargar tus rutas: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchMyRutas();
  }, []);

  if (loading) {
    return (
      <div className="rutas-compartidas-container">
        <p>Cargando tus rutas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rutas-compartidas-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="rutas-compartidas-container">
      <div className="encabezado-compartidas">
        <h2>Mis rutas publicadas</h2>
        <p>Aquí verás las rutas que has agregado.</p>
      </div>

      {rutas.length === 0 ? (
        <div className="compartir-contenido" style={{ padding: 20 }}>
          <p style={{ margin: 0 }}>No has publicado rutas todavía.</p>
          <button className="btn-compartir" style={{ margin: '0 auto' }} onClick={onCrear}>
            <span role="img" aria-label="agregar">➕</span>
            Crear mi primera ruta
          </button>
        </div>
      ) : (
        <ul className="pinboard-list">
          {rutas.map((ruta) => (
            <li key={ruta.id} className="tarjeta-ruta">
              <div className="tarjeta-header">
                <h3 className="tarjeta-titulo">{ruta.titulo}</h3>
                <span className="icono-info" role="img" aria-label="información">ℹ️</span>
              </div>
              <div className="info-ruta">
                <div className="ruta-item">
                  <span className="icono-desde" role="img" aria-label="desde">🔴</span>
                  <div>
                    <strong>DESDE</strong>
                    <div>{ruta.desde}</div>
                  </div>
                </div>
                <div className="ruta-item">
                  <span className="icono-hasta" role="img" aria-label="hasta">🟢</span>
                  <div>
                    <strong>HASTA</strong>
                    <div>{ruta.hasta}</div>
                  </div>
                </div>
              </div>
              <div className="tarjeta-descripcion">{ruta.descripcion}</div>
              <div className="tarjeta-footer">
                <div className="info-transporte">
                  <span className="icono-transporte" role="img" aria-label={ruta.transporte}>
                    {{ 'A pie': '🚶', 'Transporte publico': '🚌', Auto: '🚗' }[ruta.transporte] || '🚗'}
                  </span>
                  {ruta.transporte} • {ruta.fecha}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="contenedor-volver">
        <button className="btn-volver" onClick={onVolver}>Volver</button>
      </div>
    </div>
  );
};

export default MisRutas;