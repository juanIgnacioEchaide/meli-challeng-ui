import axiosClient from ".";
import { ItemDTO, ShortenItemDTO } from "../@types/dto/item.dto";
import { getMockedShortenItem } from "../utils/get-mocked-items";


export async function getItemDescription(id: string): Promise<ShortenItemDTO> {
    try {
        const res = await axiosClient.get(`items/${id}/description`);

        const data = res.data;
        const items: ItemDTO = data.results;

        return items;
    } catch (error) {
        console.error('Fallo la solicitud con axios, devolviendo mocked items:', error);

        const mocked = getMockedShortenItem(id);
        return mocked;
    }
}
