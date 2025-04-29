export interface ItemDTO {
      id: string;
      title: string;
      thumbnail: string;
      price: number;
      currency_id: string;
      seller_address: {
        city: {
          name: string;
        };
      };
    }

    export type ShortenItemDTO = Omit<ItemDTO, 'seller_address'>