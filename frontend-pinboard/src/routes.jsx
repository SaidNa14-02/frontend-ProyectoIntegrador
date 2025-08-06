// routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login"; // ajusta la ruta según dónde esté tu componente

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
