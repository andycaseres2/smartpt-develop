import { create } from "zustand";

// Función para eliminar el token del localStorage
const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenTime");
};

export const userStore = create((set) => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  // Verificar si el token ha expirado y eliminarlo si es necesario
  if (storedToken) {
    const tokenTime = localStorage.getItem("tokenTime");
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - parseInt(tokenTime);

    if (elapsedTime > 8 * 3600000) {
      // Si ha pasado más de una hora
      removeToken(); // Eliminar el token
    }
  }

  return {
    user: storedUser ? JSON.parse(storedUser) : {},
    setUser: (user) => {
      set({ user });
      localStorage.setItem("user", JSON.stringify(user));
    },
    token: storedToken || "",
    setToken: (newToken) => {
      set({ token: newToken });
      if (newToken) {
        localStorage.setItem("token", newToken);
        localStorage.setItem("tokenTime", new Date().getTime().toString());
        // Establecer un temporizador para eliminar el token después de una hora
        setTimeout(removeToken, 3600000);
      } else {
        removeToken();
      }
    },
  };
});
