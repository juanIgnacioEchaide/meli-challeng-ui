import Link from "next/link";
import { getMockedItems } from "../utils/get-mocked-items";
import { searchItems } from "../api/searchItems";

export default async function ItemsPage({
    searchParams,
}: {
    searchParams: { search?: string; limit?: string };
}) {
    const query = searchParams?.search || "";
    const DEFAULT_ITEMS_LIMIT = 4;

    const results = await searchItems(query, DEFAULT_ITEMS_LIMIT);

    return (
        <section>
            <h2 className="px-4 py-4">Resultados para {query}</h2>
            {results.map((item: any) => (
                <Link 
                    href={`/${item.name}`} 
                    key={item.id} 
                    // Aquí no modificamos la href, respetamos la estructura que te pidieron
                >
                    <div className="flex gap-4 items-center border-b py-4">
                        <img alt={item.title} src={item.thumbnail} className="w-24 h-24 object-cover" />
                        <div>
                            <p className="text-lg font-semibold">
                                ${Number(item.price).toLocaleString('es-AR', { style: 'currency', currency: item.currency_id })}
                            </p>
                            <p className="text-gray-700">{item.title}</p>
                        </div>
                        <span className="ml-auto text-sm capitalize opacity-50">
                            {item.seller_address.city.name.toLowerCase()}
                        </span>
                    </div>
                </Link>
            ))}
        </section>
    );
}
