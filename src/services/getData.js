// Función para realizar solicitudes GET// Función para realizar solicitudes POST
export const getData = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
