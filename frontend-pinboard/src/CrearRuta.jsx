import { useState } from 'react'
import './App.css'

function CrearRuta({ onAgregarRuta, onCancelar }) {
  const [nuevaRuta, setNuevaRuta] = useState({ 
    titulo: '', 
    desde: '', 
    hasta: '', 
    descripcion: '', 
    transporte: 'Bus' 
  });

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // Validar que todos los campos estén llenos
    if (
      !nuevaRuta.titulo.trim() ||
      !nuevaRuta.desde.trim() ||
      !nuevaRuta.hasta.trim() ||
      !nuevaRuta.descripcion.trim()
    ) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    // Agregar fecha actual
    const rutaCompleta = {
      ...nuevaRuta,
      fecha: new Date().toLocaleDateString('es-ES', { 
        month: 'short', 
        day: '2-digit' 
      }),
      favorito: false
    };
    
    // Llamar la función para agregar la ruta
    onAgregarRuta(rutaCompleta);
    
    // Limpiar el formulario
    setNuevaRuta({ titulo: '', desde: '', hasta: '', descripcion: '', transporte: 'Bus' });
    
    alert('Ruta creada exitosamente!');
  };

  return (
    <div className="crear-ruta-container">
      <h2 className="crear-ruta-titulo">Agregar Nueva Ruta Segura</h2>
      <p className="crear-ruta-descripcion">
        Comparte una ruta segura que conozcas para ayudar a otros usuarios
      </p>
      
      <form className="pinboard-form" onSubmit={manejarEnvio}>
        <input
          type="text"
          value={nuevaRuta.titulo}
          onChange={e => setNuevaRuta({ ...nuevaRuta, titulo: e.target.value })}
          placeholder="Título de la ruta (ej: Ruta segura Norte - Centro)"
        />
        
        <input
          type="text"
          value={nuevaRuta.desde}
          onChange={e => setNuevaRuta({ ...nuevaRuta, desde: e.target.value })}
          placeholder="Punto de partida (ej: Carcelén bajo)"
        />
        
        <input
          type="text"
          value={nuevaRuta.hasta}
          onChange={e => setNuevaRuta({ ...nuevaRuta, hasta: e.target.value })}
          placeholder="Destino (ej: Universidad Católica)"
        />
        
        <textarea
          value={nuevaRuta.descripcion}
          onChange={e => setNuevaRuta({ ...nuevaRuta, descripcion: e.target.value })}
          placeholder="Describe la ruta: buses que tomar, paradas importantes, horarios recomendados..."
          rows="4"
        />
        
        <select
          value={nuevaRuta.transporte}
          onChange={e => setNuevaRuta({ ...nuevaRuta, transporte: e.target.value })}
        >
          <option value="Bus">Bus</option>
          <option value="Auto">Auto</option>
          <option value="Metro">Metro</option>
          <option value="Bici">Bicicleta</option>
        </select>
        
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
