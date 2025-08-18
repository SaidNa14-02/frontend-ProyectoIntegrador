import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('ProtectedRoute: Verificando autenticación...');
    
    // Verificar si existe un token en localStorage
    const token = localStorage.getItem('auth');
    console.log('ProtectedRoute: Token encontrado:', token ? 'Sí' : 'No');
    
    if (token) {
      try {
        // Intentar parsear el token para verificar que es válido
        const parsedToken = JSON.parse(token);
        console.log('ProtectedRoute: Token parseado exitosamente');
        setIsAuthenticated(true);
      } catch (error) {
        console.log('ProtectedRoute: Error al parsear token, limpiando localStorage');
        localStorage.removeItem('auth');
        setIsAuthenticated(false);
      }
    } else {
      console.log('ProtectedRoute: No se encontró token');
      setIsAuthenticated(false);
    }
    
    setIsLoading(false);
  }, []);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Verificando autenticación...
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    console.log('ProtectedRoute: Usuario no autenticado, redirigiendo a login');
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, mostrar el contenido protegido
  console.log('ProtectedRoute: Usuario autenticado, mostrando contenido');
  return children;
};

export default ProtectedRoute;
