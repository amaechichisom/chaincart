import { Bath, BedDouble } from "lucide-react";

type IPropertyIInfo = {
  beds?: number;
  bath?: number;
  address?: string;
  title?: string;
};
export default function PropertyInfo({
  address,
  bath,
  beds,
  title,
}: IPropertyIInfo) {
  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
      <p className="text-sm text-neutral-500">{address}</p>
      <div className="flex gap-4">
        {bath && (
          <div className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-full">
            <Bath className="w-4 h-4 text-blue-600" /> 3 Baths
          </div>
        )}
        {beds && (
          <div className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-full">
            <BedDouble className="w-4 h-4 text-blue-600" /> 3 Beds
          </div>
        )}
      </div>
    </div>
  );
}
