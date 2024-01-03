import { Routes, Route, Navigate } from "react-router-dom";
import Planning from "../pages/Planning/Planning";
import Requests from "../pages/Requests/Requests";
import Login from "../pages/Login/Login";
import RequestsData from "../pages/RequestsData/RequestsData";
import Budget from "../pages/Budget/Budget";
import Dashboard from "../pages/Dashboard/Dashboard";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/planeacion" element={<Planning />} />
      <Route path="/solicitudes" element={<Requests />} />
      <Route path="/solicitudes/informacion" element={<RequestsData />} />
      <Route path="/presupuesto" element={<Budget />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Router;
