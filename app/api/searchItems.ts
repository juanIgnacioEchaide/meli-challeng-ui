import axiosClient from ".";
import { getAccessToken } from "../lib/authService";

export const searchItems = async (query: string, limit: number = 10) => {
  if (!query || query.trim() === "") {
    console.warn("El query está vacío. No se realiza la solicitud.");
    return [];
  }

  try {
    const token = getAccessToken();

    const { data } = await axiosClient.get(`/sites/MLA/search`, {
      params: {
        q: query,
        limit: limit,
      },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });


    return data.results;
  } catch (error) {
    console.error("Error al realizar la búsqueda", error);
    return [];
  }
};
