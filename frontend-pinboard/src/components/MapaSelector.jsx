import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet

// Corrige el problema de los iconos de marcador de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse';

function LocationMarker({ onLocationSelect, initialPosition }) {
  const [position, setPosition] = useState(initialPosition);
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      
      try {
        const response = await axios.get(NOMINATIM_REVERSE_URL, {
          params: {
            lat: lat,
            lon: lng,
            format: 'jsonv2',
          }
        });
        const address = response.data.display_name;
        onLocationSelect({ lat, lon: lng, address });
      } catch (error) {
        console.error('Error al geocodificar la dirección inversa:', error);
        onLocationSelect({ lat, lon: lng, address: 'Ubicación desconocida' });
      }
    },
    locationfound: (e) => {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      onLocationSelect({ lat, lon: lng, address: 'Mi ubicación actual' });
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
      map.flyTo(initialPosition, map.getZoom());
    }
  }, [initialPosition, map]);

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

function MapaSelector({ isOpen, onClose, onSelectLocation, initialLat, initialLon }) {
  if (!isOpen) return null;

  const defaultPosition = [initialLat || -0.180653, initialLon || -78.467829]; // Quito, Ecuador

  const handleSelect = (locationData) => {
    onSelectLocation(locationData);
    onClose();
  };

  return (
    <div className="mapa-selector-overlay">
      <div className="mapa-selector-content">
        <h3>Selecciona una ubicación en el mapa</h3>
        <MapContainer 
          center={defaultPosition} 
          zoom={13} 
          scrollWheelZoom={true}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onLocationSelect={handleSelect} initialPosition={defaultPosition} />
        </MapContainer>
        <div className="mapa-selector-actions">
          <button onClick={onClose} className="btn-cancelar">Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default MapaSelector;
