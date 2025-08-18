import React, { useState } from 'react';
import GetAvatar from '../Avatar.jsx';  

function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [user, setUser ] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        cedula: '',
        conductor: '',
        placa: '',
        capacidadvehiculo: ''
    });

    const userId = 1;//Provisional

    useEffect(() => {
        fetchUser ();
    }, []);
    const fetchUser  = async () => {
        try {
            const response = await axios.get(`/api/usuario/${userId}`);
            setUser (response.data);
            setFormData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Si no se puede obtener el usuario de la API, intenta obtenerlo de localStorage
            const storedUser  = JSON.parse(localStorage.getItem("user"));
            if (storedUser ) {
                setUser (storedUser );
                setFormData(storedUser );
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/usuario/${userId}`, formData);
            setUser (response.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/usuario/${userId}`);
            setUser (null);
            localStorage.removeItem("user"); // Eliminar datos del usuario de localStorage
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };



  // Función para actualizar el avatar (se la pasamos a GetAvatar)
  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  };

  return (
    <div className="profile-container">
      <h1>Mi perfil</h1>
      {/* Componente para cargar/mostrar avatar */}
      <GetAvatar avatar={avatar} updateAvatar={updateAvatar} text="Cambiar avatar" />
      <h1>Perfil de Usuario</h1>
      {isEditing ? (
          <form onSubmit={handleUpdate}>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
              <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" required />
              <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo" required />
              <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} placeholder="Cédula" required />
              <input type="text" name="conductor" value={formData.conductor} onChange={handleChange} placeholder="Conductor" />
              <input type="text" name="placa" value={formData.placa} onChange={handleChange} placeholder="Placa" />
              <input type="number" name="capacidadvehiculo" value={formData.capacidadvehiculo} onChange={handleChange} placeholder="Capacidad Vehículo" />
              <button type="submit">Actualizar</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
          </form>
      ) : (
          <div>
              <p><strong>Nombre:</strong> {user.nombre}</p>
              <p><strong>Apellido:</strong> {user.apellido}</p>
              <p><strong>Correo:</strong> {user.correo}</p>
              <p><strong>Cédula:</strong> {user.cedula}</p>
              <p><strong>Conductor:</strong> {user.conductor}</p>
              <p><strong>Placa:</strong> {user.placa}</p>
              <p><strong>Capacidad Vehículo:</strong> {user.capacidadvehiculo}</p>
              <button onClick={() => setIsEditing(true)}>Editar</button>
              <button onClick={handleDelete}>Eliminar</button>
          </div>
      )}
    </div>
  );
}

export default Profile;
