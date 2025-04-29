import { getItemDescription } from "../api/getItemDescription";


export default async function ItemDescription({ id }: { id: string }) {
  const description = await getItemDescription(id);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Descripción</h3>
      <p className="text-gray-700">{description.price}</p>
    </div>
  );
}
