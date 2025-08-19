import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const Reserva = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const viaje = state?.viaje;

  const [form, setForm] = useState({ nombre: '', telefono: '', asientos: 1, notas: '' });

  if (!viaje) {
    return (
      <div className="crear-ruta-container">
        <p>No hay datos del viaje.</p>
        <div className="botones-formulario" style={{ justifyContent: 'center' }}>
          <button type="button" className="btn-cancelar" onClick={() => navigate(-1)}>Volver</button>
        </div>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    
    try {
      await axiosInstance.post('/api/reservas', { viajeId: viaje.id });
      toast.success(`Reserva exitosa para ${viaje.conductor} | Asientos: ${form.asientos}`);
      navigate('/');
    } catch (error) {
      console.error('Error al realizar la reserva:', error.response?.data || error.message);
      toast.error('Error al realizar la reserva: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="crear-ruta-container">
      <h2 className="crear-ruta-titulo">Reserva de viaje</h2>
      <p className="crear-ruta-descripcion">
        <strong>Conductor:</strong> {viaje.conductor} · {viaje.fecha} {viaje.hora}
        <br />
        <strong>Trayecto:</strong> {viaje.desde} → {viaje.hasta}
        {typeof viaje.asientos === 'number' && (
          <>
            <br />
            <strong>Asientos disponibles:</strong> {viaje.asientos}
          </>
        )}
      </p>

      <form onSubmit={submit} className="pinboard-form">
        <input
          required
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          type="tel"
          required
          placeholder="Tu teléfono"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />
        <input
          type="number"
          min={1}
          max={viaje.asientos ?? 1}
          required
          placeholder="Asientos a reservar"
          value={form.asientos}
          onChange={(e) => setForm({ ...form, asientos: Number(e.target.value) })}
        />
        <textarea
          placeholder="Notas para el conductor (opcional)"
          value={form.notas}
          onChange={(e) => setForm({ ...form, notas: e.target.value })}
        />

        <div className="botones-formulario">
          <button type="button" className="btn-cancelar" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type="submit" className="btn-guardar">
            Confirmar reserva
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reserva;