// import { shopProptiesData } from "@/CONSTANT/data";
import ApiStatusMessage from "../shared/ApiStatusMessage";
import ShopCard, { ShopCardProps } from "./ShopCard";
import { useAllProductQuery } from "@/api/prodService";
// import { PropertyCardProps } from "../shared/PropertyCard";

export default function ShopList() {
    const {isLoading,data,error} = useAllProductQuery({})
        
  return (
     <section className="md:col-span-3">
        
              <ApiStatusMessage
                isLoading={isLoading}
                error={error}
                loadingText="Loading products..."
                errorText="Failed to load products. Please try again."
              />
    <div className="grid grid-cols-3 gap-6 p-4 pt-2">
      
      {data?.data?.products?.length > 0 ? (
            data?.data.products.slice(0,100).map((property: ShopCardProps, index: number) => (
              <ShopCard key={index} {...property} />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No products available.</p>
          )}
    </div>
    </section>
  );
}
