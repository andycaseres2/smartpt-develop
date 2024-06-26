export const deleteData = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to delete data");
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
