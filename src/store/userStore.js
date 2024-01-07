import { create } from "zustand";

export const userStore = create((set) => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  return {
    user: storedUser ? JSON.parse(storedUser) : [1],
    setUser: (user) => {
      set({ user });
      localStorage.setItem("user", JSON.stringify(user));
    },
    token: storedToken || "",
    setToken: (newToken) => {
      set({ token: newToken });
      if (newToken) {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
      }
    },
  };
});
