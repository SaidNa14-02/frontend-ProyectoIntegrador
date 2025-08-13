import React, { useState } from 'react';
import GetAvatar from '../Avatar.jsx';  // Ajusta la ruta si es necesario

function Profile() {
  // Estado local para guardar la imagen del avatar
  const [avatar, setAvatar] = useState(null);

  // Función para actualizar el avatar (se la pasamos a GetAvatar)
  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  };

  return (
    <div>
      <h1>Mi perfil</h1>

      {/* Componente para cargar/mostrar avatar */}
      <GetAvatar avatar={avatar} updateAvatar={updateAvatar} text="Cambiar avatar" />
    </div>
  );
}

export default Profile;
