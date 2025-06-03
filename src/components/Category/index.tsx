
import PropertyItem from "../Home/PropertyItem";
import { ILandListing } from "@/@types/types";
import NoContent from "../shared/NoContent";

export default function Category({filteredProducts}:{filteredProducts:ILandListing[]}) {

   if(filteredProducts.length === 0){
    return <NoContent/>
   }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {filteredProducts
        .map((item: ILandListing, idx) => (
          <PropertyItem key={idx} {...item} _id={`/property/${item._id}`} />
        ))}
    </div>
  );
}
