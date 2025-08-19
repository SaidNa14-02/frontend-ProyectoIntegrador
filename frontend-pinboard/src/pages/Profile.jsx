import React, { useState, useEffect } from 'react';
import GetAvatar from '../Avatar.jsx';  
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';
import '../styles/Profile.css'

function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    cedula: '',
    conductor: false,
    placa: '',
    capacidadvehiculo: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/usuarios/me/profile');
      setUser(response.data.data);
      setFormData(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data || error.message);
      toast.error('Error al cargar el perfil: ' + (error.response?.data?.message || error.message));
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!user || !user.id) {
        toast.error("No se pudo obtener el ID del usuario para actualizar.");
        return;
      }
      const response = await axiosInstance.patch(`/api/usuarios/${user.id}`, formData);
      setUser(response.data.data);
      setFormData(response.data.data);
      setIsEditing(false);
      toast.success("Perfil actualizado correctamente!");
    } catch (error) {
      console.error("Error updating user data:", error.response?.data || error.message);
      toast.error('Error al actualizar el perfil: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible.")) {
      try {
        if (!user || !user.id) {
          toast.error("No se pudo obtener el ID del usuario para eliminar.");
          return;
        }
        await axiosInstance.delete(`/api/usuarios/${user.id}`);
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        toast.success("Cuenta eliminada exitosamente.");
        navigate('/login');
      } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        toast.error('Error al eliminar la cuenta: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  };

  if (loading) {
    return (
      <div className="profile-container">
        <h1>Cargando perfil...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <h1>No se pudo cargar el perfil.</h1>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Mi perfil</h1>
      <GetAvatar avatar={avatar} updateAvatar={updateAvatar} text="Cambiar avatar" />
      
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          <label>Apellido:</label>
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
          <label>Correo:</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
          <label>Cédula:</label>
          <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} required />
          
          <label>
            <input 
              type="checkbox" 
              name="conductor" 
              checked={formData.conductor} 
              onChange={handleChange} 
            />
            Soy Conductor
          </label>

          {formData.conductor && (
            <>
              <label>Placa:</label>
              <input type="text" name="placa" value={formData.placa || ''} onChange={handleChange} placeholder="Placa del vehículo" />
              <label>Capacidad del Vehículo:</label>
              <input type="number" name="capacidadvehiculo" value={formData.capacidadvehiculo || ''} onChange={handleChange} placeholder="Capacidad del vehículo" min="1" max="7" />
            </>
          )}

          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      ) : (
        <div>
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Apellido:</strong> {user.apellido}</p>
          <p><strong>Correo:</strong> {user.correo}</p>
          <p><strong>Cédula:</strong> {user.cedula}</p>
          <p><strong>Conductor:</strong> {user.conductor ? 'Sí' : 'No'}</p>
          {user.conductor && (
            <>
              <p><strong>Placa:</strong> {user.placa}</p>
              <p><strong>Capacidad Vehículo:</strong> {user.capacidadvehiculo}</p>
            </>
          )}
        <button onClick={() => setIsEditing(true)}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
        <button onClick={() => navigate('/me/password')}>Cambiar Contraseña</button>
        <Link to="/" className="button-link">Volver</Link>
      </div>
    )}
  </div>
  );
}

export default Profile;