import { Bath, BedDouble } from "lucide-react";

export default function PropertyInfo() {
  return (
 <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Ahmadu Bello St</h3>
        <p className="text-sm text-neutral-500">
          Lekki Conservation Centre, Elegushi Beach, Lagos
        </p>
        <div className="flex gap-4">
          <div className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-full">
            <BedDouble className="w-4 h-4 text-blue-600" /> 3 Beds
          </div>
          <div className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-full">
            <Bath className="w-4 h-4 text-blue-600" /> 3 Baths
          </div>
        </div>
      </div>
  )
}
