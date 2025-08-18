// routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login"; // ajusta la ruta según dónde esté tu componente
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta protegida - requiere autenticación */}
        <Route path="/" element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        } />
        
        {/* Ruta de reserva (protegida) - usa App como layout para conservar navbar/diseño */}
        <Route path="/reserva" element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        } />

        {/* Rutas públicas - accesibles sin autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
