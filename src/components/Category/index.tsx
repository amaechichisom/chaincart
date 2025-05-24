import { apartmentData } from "@/CONSTANT/data";
import PropertyItem from "../Home/PropertyItem";

export default function Category() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array(6)
        .fill(apartmentData)
        .flat()
        .map((item, idx) => (
          <PropertyItem key={idx} {...item} id={`/property/${idx}`} />
        ))}
    </div>
  );
}
