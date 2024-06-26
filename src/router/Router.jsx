import { Routes, Route, Navigate } from "react-router-dom";
import Planning from "../pages/Planning/Planning";
import Requests from "../pages/Requests/Requests";
import Login from "../pages/Login/Login";
import RequestsData from "../pages/RequestsData/RequestsData";
import Budget from "../pages/Budget/Budget";
import Dashboard from "../pages/Dashboard/Dashboard";
import { userStore } from "../store/userStore";

const Router = () => {
  const { user, token } = userStore(); // Obtiene el usuario y el token del store de Zustand

  // Función para comprobar la autenticación y redirigir si es necesario
  const checkAuth = () => {
    if (!user || !token) {
      return <Navigate to="/login" />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      {/* Protege las rutas que necesitas */}
      <Route path="/planeacion" element={checkAuth() || <Planning />} />
      <Route path="/solicitudes" element={checkAuth() || <Requests />} />
      <Route
        path="/solicitudes/informacion"
        element={checkAuth() || <RequestsData />}
      />
      <Route path="/presupuesto" element={checkAuth() || <Budget />} />
      <Route path="/dashboard" element={checkAuth() || <Dashboard />} />
    </Routes>
  );
};

export default Router;
