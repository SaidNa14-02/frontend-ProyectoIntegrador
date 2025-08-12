import { useState } from 'react'
import './App.css'

// COMPONENTE CREAR RUTA - Formulario para agregar nuevas rutas
function CrearRuta({ onAgregarRuta, onCancelar }) {
  // ESTADO - Datos del formulario
  const [nuevaRuta, setNuevaRuta] = useState({ 
    titulo: '', 
    desde: '', 
    hasta: '', 
    descripcion: '', 
    transporte: 'Bus' 
  });

  // FUNCIONALIDAD - Envío del formulario con validación
  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // Validación de campos obligatorios
    if (
      !nuevaRuta.titulo.trim() ||
      !nuevaRuta.desde.trim() ||
      !nuevaRuta.hasta.trim() ||
      !nuevaRuta.descripcion.trim()
    ) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    // Preparar datos con fecha automática
    const rutaCompleta = {
      ...nuevaRuta,
      fecha: new Date().toLocaleDateString('es-ES', { 
        month: 'short', 
        day: '2-digit' 
      }),
      favorito: false
    };
    
    // Comunicación con componente padre
    onAgregarRuta(rutaCompleta);
    
    // Reset del formulario
    setNuevaRuta({ titulo: '', desde: '', hasta: '', descripcion: '', transporte: 'Bus' });
    
    alert('Ruta creada exitosamente!');
  };

  return (
    <div className="crear-ruta-container">
      <h2 className="crear-ruta-titulo">Agregar Nueva Ruta Segura</h2>
      <p className="crear-ruta-descripcion">
        Comparte una ruta segura que conozcas para ayudar a otros usuarios
      </p>
      
      {/* FORMULARIO - Campos controlados con React */}
      <form className="pinboard-form" onSubmit={manejarEnvio}>
        {/* Campo título */}
        <input
          type="text"
          value={nuevaRuta.titulo}
          onChange={e => setNuevaRuta({ ...nuevaRuta, titulo: e.target.value })}
          placeholder="Título de la ruta (ej: Ruta segura Norte - Centro)"
        />
        
        {/* Campo origen */}
        <input
          type="text"
          value={nuevaRuta.desde}
          onChange={e => setNuevaRuta({ ...nuevaRuta, desde: e.target.value })}
          placeholder="Punto de partida (ej: Carcelén bajo)"
        />
        
        {/* Campo destino */}
        <input
          type="text"
          value={nuevaRuta.hasta}
          onChange={e => setNuevaRuta({ ...nuevaRuta, hasta: e.target.value })}
          placeholder="Destino (ej: Universidad Católica)"
        />
        
        {/* Campo descripción */}
        <textarea
          value={nuevaRuta.descripcion}
          onChange={e => setNuevaRuta({ ...nuevaRuta, descripcion: e.target.value })}
          placeholder="Describe la ruta: buses que tomar, paradas importantes, horarios recomendados..."
          rows="4"
        />
        
        {/* Selector de transporte */}
        <select
          value={nuevaRuta.transporte}
          onChange={e => setNuevaRuta({ ...nuevaRuta, transporte: e.target.value })}
        >
          <option value="Bus">Bus</option>
          <option value="Auto">Auto</option>
          <option value="Metro">Metro</option>
          <option value="Bici">Bicicleta</option>
        </select>
        
        {/* Botones de acción */}
        <div className="botones-formulario">
          <button type="submit" className="btn-guardar">
            Guardar Ruta
          </button>
          <button
            type="button"
            className="btn-cancelar"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearRuta
