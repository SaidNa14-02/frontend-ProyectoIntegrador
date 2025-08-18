import React from 'react';

const MisRutas = ({ rutas = [], onVolver, onCrear }) => {
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
          {rutas.map((ruta, idx) => (
            <li key={idx} className="tarjeta-ruta">
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
                    {{ Bus: '🚌', Auto: '🚗', Metro: '🚇', Bici: '🚲' }[ruta.transporte] || '🚗'}
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
