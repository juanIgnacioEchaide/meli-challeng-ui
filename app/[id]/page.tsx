import { Suspense } from "react";
import ItemDescription from "./ItemDescription";
import { getItemDescription } from "../api/getItemDescription";

export default async function ItemPage({
    searchParams,
}: {
    searchParams: { id?: string; limit?: string };
}) {
    const id = await searchParams?.id || "";
    const item = await getItemDescription(id)

    return (
        <section>
                <div key={item.id} className="flex grid gap-4 items-center border-b py-4">
                    <img alt={item.title} src={item.thumbnail} className="w-24 h-24 object-cover" />
                    <div>
                        <p className="text-lg font-semibold">
                            ${Number(item.price).toLocaleString('es-AR', { style: 'currency', currency: item.currency_id })}
                        </p>
                        <p className="text-gray-700">{item.title}</p>
                    </div>
                    <hr></hr>
                    <Suspense>
                        <ItemDescription id={item.id} />
                    </Suspense>
                </div>
        </section>

    );
}
