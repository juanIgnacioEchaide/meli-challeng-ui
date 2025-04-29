import { ItemDTO, ShortenItemDTO } from "../@types/dto/item.dto";

export function getMockedItems(query: string): ItemDTO[] {
    const baseId = query.slice(0, 3).toUpperCase();
    const cityNames = ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"];

    return Array.from({ length: 4 }, (_, index) => ({
        id: `${baseId}-${index}`,
        title: `${query} Item ${index + 1}`,
        thumbnail: `package.png`,
        price: Math.floor(Math.random() * 10000) + 1000,
        currency_id: "ARS",
        seller_address: {
            city: {
                name: cityNames[index % cityNames.length],
            },
        },
    }));
}

export function getMockedShortenItem(q: string) : ShortenItemDTO{
    const [firstItem] = getMockedItems(q);
    const { seller_address, ...rest } = firstItem;
    return rest;
}

export function getMockedDescription(q: string) {
    const phrases = [
      "Producto maravilloso.",
      "Super recomendable.",
      "No incluye baterías.",
      "Diseño elegante y funcional.",
      "Ideal para el uso diario.",
      "Fabricado con materiales de alta calidad.",
      "Gran relación precio-calidad.",
      "Fácil de usar y mantener.",
      "Probado por expertos en el rubro.",
      "Edición limitada.",
      "Disponible por tiempo limitado.",
      "Compatible con otros productos similares.",
      "Garantía de satisfacción.",
      "Miles de usuarios ya lo disfrutan.",
    ];
  
    // Mezclar las frases y tomar entre 6 y 10 frases aleatorias
    const shuffled = phrases.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 5) + 6);
  
    const text = `Descripción para "${q}": ` + selected.join(" ");
  
    return {
      plain_text: text,
    };
  }
  