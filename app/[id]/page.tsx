import { Suspense } from "react";
import ItemDescription from "./ItemDescription";
import { getItemDescription } from "../api/getItemDescription";

export default async function ItemPage({
    searchParams,
}: {
    searchParams: { id?: string; title?: string; price?: string; currency?: string; thumbnail?: string };
}) {
    // Accediendo a los parámetros de la URL
    const { id, title, price, currency, thumbnail } = searchParams;

    // Obteniendo la descripción del artículo
    const { plain_text } = await getItemDescription(id || "");

    return (
        <section>
            <div key={id} className="flex grid gap-4 items-center border-b py-4">
                <img
                    alt={title}
                    src={thumbnail}
                    className="w-24 h-24 object-cover"
                />
                <div>
                    <p className="text-lg font-semibold">
                        {price}
                    </p>
                    <p className="text-gray-700">{title}</p>
                </div>
                <hr />
                <Suspense fallback={<p>Loading description...</p>}>
                    <ItemDescription plainText={plain_text} />
                </Suspense>
            </div>
        </section>
    );
}
