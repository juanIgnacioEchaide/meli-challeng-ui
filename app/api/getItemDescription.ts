import axios from "axios";
import { getValidAccessToken } from "../lib/authService";
import { getMockedDescription } from "../utils/get-mocked-items";

export async function getItemDescription(id: string): Promise<{ plain_text: string }> {
    try {
      const accessToken = await getValidAccessToken();
  
      if (!accessToken) throw new Error("No access token");
  
      const { data } = await axios.get(`https://api.mercadolibre.com/items/${id}/description`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      return data;
    } catch (error) {
      console.warn("🔁 Usando mock de descripción:", error);
      return getMockedDescription('');
    }
  }