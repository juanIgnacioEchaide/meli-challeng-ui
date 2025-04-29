import axios from "axios";
import { ItemDTO } from "../@types/dto/item.dto";
import { getValidAccessToken } from "../lib/authService";
import { getMockedItems } from "../utils/get-mocked-items";

export async function searchItems(query: string, limit: number): Promise<ItemDTO[]> {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) throw new Error("No access token");

    const { data } = await axios.get("https://api.mercadolibre.com/sites/MLA/search", {
      params: { q: query, limit },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.results as ItemDTO[];
  } catch (error) {
    console.warn("🔁 Usando mocks por error en búsqueda real:", error);
    return getMockedItems(query);
  }
}