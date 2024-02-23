// Función para realizar solicitudes POST
export const putData = async (url, body, token) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
