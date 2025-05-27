// import { apartmentData } from "@/CONSTANT/data";
import PropertyItem from "../Home/PropertyItem";
import { useAllProductQuery } from "@/api/prodService";
import { ILandListing } from "@/@types/types";
import Loading from "../shared/Loading";

export default function Category() {
      const { isLoading, data, error } = useAllProductQuery({});
      console.log({data})
      if(isLoading){
        return <Loading/>
      }
      const BestApertmetList = data?.data.products as ILandListing[]
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array(3)
        .fill(BestApertmetList)
        .flat()
        .map((item:ILandListing, idx) => (
          <PropertyItem key={idx} {...item} _id={`/property/${item._id}`} />
        ))}
    </div>
  );
}
