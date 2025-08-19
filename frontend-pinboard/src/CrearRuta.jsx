import { useState } from 'react';
import './App.css';
import MapaSelector from './components/MapaSelector';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './styles/MapaSelector.css';
import axiosInstance from './api/axiosInstance';
import { toast } from 'react-toastify';

function CrearRuta({ onAgregarRuta, onCancelar }) {
  const [nuevaRuta, setNuevaRuta] = useState({ 
    titulo: '', 
    desde: '', 
    desde_lat: null,
    desde_lon: null,
    hasta: '', 
    hasta_lat: null,
    hasta_lon: null,
    descripcion: '', 
    transporte: 'Transporte publico' 
  });

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const handleLocationSelect = (locationData) => {
    if (currentField === 'desde') {
      setNuevaRuta(prev => ({
        ...prev,
        desde: locationData.address,
        desde_lat: locationData.lat,
        desde_lon: locationData.lon,
      }));
    } else if (currentField === 'hasta') {
      setNuevaRuta(prev => ({
        ...prev,
        hasta: locationData.address,
        hasta_lat: locationData.lat,
        hasta_lon: locationData.lon,
      }));
    }
  };

  const openMap = (field) => {
    setCurrentField(field);
    setIsMapOpen(true);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    if (
      !nuevaRuta.titulo.trim() ||
      !nuevaRuta.desde.trim() ||
      !nuevaRuta.hasta.trim() ||
      !nuevaRuta.descripcion.trim() ||
      nuevaRuta.desde_lat === null ||
      nuevaRuta.desde_lon === null ||
      nuevaRuta.hasta_lat === null ||
      nuevaRuta.hasta_lon === null
    ) {
      toast.error('Por favor completa todos los campos y selecciona las ubicaciones en el mapa.');
      return;
    }
    
    const rutaData = {
      titulo: nuevaRuta.titulo,
      descripcion: nuevaRuta.descripcion,
      punto_inicio: nuevaRuta.desde,
      punto_inicio_lat: nuevaRuta.desde_lat,
      punto_inicio_lon: nuevaRuta.desde_lon,
      punto_destino: nuevaRuta.hasta,
      punto_destino_lat: nuevaRuta.hasta_lat,
      punto_destino_lon: nuevaRuta.hasta_lon,
      tipo_transporte: nuevaRuta.transporte,
    };
    
    try {
      const response = await axiosInstance.post('/api/rutas', rutaData);
      toast.success('Ruta creada exitosamente!');
      onAgregarRuta({ 
        ...nuevaRuta,
        fecha: new Date().toLocaleDateString('es-ES', { 
          month: 'short', 
          day: '2-digit' 
        }),
        favorito: false,
        own: true,
        ...response.data.data 
      });
      
      setNuevaRuta({ 
        titulo: '', 
        desde: '', 
        desde_lat: null,
        desde_lon: null,
        hasta: '', 
        hasta_lat: null,
        hasta_lon: null,
        descripcion: '', 
        transporte: 'Transporte publico' 
      });
      
    } catch (error) {
      console.error('Error al crear la ruta:', error.response?.data || error.message);
      toast.error('Error al crear la ruta: ' + (error.response?.data?.message || error.message));
    }
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
        
        <div className="input-with-button">
          <input
            type="text"
            value={nuevaRuta.desde}
            onChange={e => setNuevaRuta({ ...nuevaRuta, desde: e.target.value })}
            placeholder="Punto de partida (ej: Carcelén bajo)"
            readOnly
          />
          <button type="button" onClick={() => openMap('desde')} className="map-icon-button">
            <FaMapMarkerAlt />
          </button>
        </div>
        
        <div className="input-with-button">
          <input
            type="text"
            value={nuevaRuta.hasta}
            onChange={e => setNuevaRuta({ ...nuevaRuta, hasta: e.target.value })}
            placeholder="Destino (ej: Universidad Católica)"
            readOnly
          />
          <button type="button" onClick={() => openMap('hasta')} className="map-icon-button">
            <FaMapMarkerAlt />
          </button>
        </div>
        
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
          <option value="BUS">Bus</option>
          <option value="AUTO">Auto</option>
          <option value="PIE">A pie</option>
          <option value="BICI">Bicicleta</option>
          <option value="TROLE">Trole</option>
          <option value="OTRO">Otro</option>
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

      <MapaSelector
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onSelectLocation={handleLocationSelect}
        initialLat={currentField === 'desde' ? nuevaRuta.desde_lat : nuevaRuta.hasta_lat}
        initialLon={currentField === 'desde' ? nuevaRuta.desde_lon : nuevaRuta.hasta_lon}
      />
    </div>
  );
}

export default CrearRuta