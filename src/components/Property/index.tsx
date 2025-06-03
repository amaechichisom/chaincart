import { apartmentData } from "@/CONSTANT/data";
import ListProperty from "../Home/ListProperty";
import ImageCollage from "../shared/ImageCollage";
import PriceBox from "./PriceBox";
import PropertyDescription from "./PropertyDescription";
import PropertyInfo from "./PropertyInfo";
import { useParams } from "react-router-dom";
import { useSingleProductQuery } from "@/api/prodService";
import Loading from "../shared/Loading";
import { ILandListing } from "@/@types/types";
import React from "react";

export default function PropertyDetail() {
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
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-10 h-full">
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
        <PriceBox price={typedData.price} id={typedData._id}/>
      </div>

      <ListProperty data={apartmentData} title="Other Properties Nearby" link="/" />
      <ListProperty data={apartmentData} title="Near you" link="/" />
    </section>
  );
}
