import { useSingleProductQuery } from "@/api/prodService";
import PropertyDescription from "../Property/PropertyDescription";
import PropertyInfo from "../Property/PropertyInfo";
import ImageCollage from "../shared/ImageCollage";
import { ILandListing } from "@/@types/types";
import { useParams } from "react-router-dom";
import React from "react";
import Loading from "../shared/Loading";
import { SpecialPrice } from "../Property/SpecialPrice";

export default function SellerProduct() {
  const { id } = useParams<{ id: string }>();
  const productId = id ?? "";

  const { isLoading, data, error } = useSingleProductQuery(productId, {
    skip: !productId,
  });

  const typedData = data?.data?.product as ILandListing | undefined;
  const pImage = typedData?.image_of_land ?? [];

  const images = React.useMemo(() => {
    if (!typedData) return [];
    return [typedData.coverImage, ...pImage].filter(Boolean);
  }, [typedData?.coverImage, pImage]);

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading property details.</p>;
  if (!typedData) return <p>Property not found.</p>;
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <ImageCollage collageImages={images} />
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start gap-3 my-5 w-full h-full">
        <div className="col-span-2">
          <PropertyInfo
            address={typedData.address}
            title={typedData.title}
            bath={typedData.baths}
            beds={typedData.beds}
          />
          <PropertyDescription description={typedData.description}/>
        </div>
        <SpecialPrice price={typedData.price} />
      </div>
    </section>
  );
}
