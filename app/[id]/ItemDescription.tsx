import { getItemDescription } from "../api/getItemDescription";

export default async function ItemDescription({ plainText }: { plainText: string }) {

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Descripción</h3>
      <p className="text-gray-700">{plainText}</p>
    </div>
  );
}
