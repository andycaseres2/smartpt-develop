import { useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Router from "./router/Router";
import { userStore } from "./store/userStore";
import { getColor } from "./utils/getColor";
import { useLocation } from "react-router-dom";
import { applyScrollbarStyles } from "./utils/applyScrollbarStyles";
import { fetch, setOriginalFetch } from "./utils/fetchInterceptor";

function App() {
  const { user, token, setUser, setToken } = userStore();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const colorInfo = getColor(currentPath).hex;
    applyScrollbarStyles(colorInfo);
    if (!user) {
      window.location.href = "/login";
    }
  }, [currentPath]);

  useEffect(() => {
    // Función para limpiar el token y el usuario después de 5 minutos
    const clearUserDataAfterTimeout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setToken("");
      setUser({});
    };

    // Establecer el temporizador para limpiar los datos después de 5 minutos
    const timeoutId = setTimeout(clearUserDataAfterTimeout, 30 * 60 * 1000);

    // Limpiar el temporizador al desmontar el componente para evitar fugas de memoria
    return () => clearTimeout(timeoutId);
  }, []); // El efecto se ejecutará solo una vez al montar el componente

  useEffect(() => {
    // Sobrescribe window.fetch con tu función personalizada
    setOriginalFetch(fetch);
  }, []);
  return (
    <main className="min-h-screen flex">
      {Object.keys(user).length > 0 && token && <Sidebar />}
      <div className="flex-1 overflow-hidden">
        <Router />
      </div>
    </main>
  );
}

export default App;
