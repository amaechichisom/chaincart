import { useNavigate } from "react-router-dom";
import { useSellerProductQuery } from "@/api/prodService";

import Loading from "@/components/shared/Loading";
import AppButton from "@/components/shared/AppButton";
import ListingCard from "@/components/Seller/ListingCard";
import { ILandListing } from "@/@types/types";
// import { IiActive } from "@/@types/types";
import { emptyStateMap } from "./emptyStateMap";
import { IiActive } from "@/page/ListingPage";

type ListingCardGroupProps = {
  status: IiActive;
};

export const ListingCardGroup = ({ status }: ListingCardGroupProps) => {
  const { data, isLoading, error } = useSellerProductQuery({});
  const navigate = useNavigate();

  const sellerProduct = data?.data?.products as ILandListing[] | undefined;

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading property details.</p>;
  if (!sellerProduct) return <p>Property not found.</p>;

  if (sellerProduct.length === 0) {
    const { image, text, buttonLabel, buttonHref } = emptyStateMap[status];
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
        <img
          src={image}
          alt={`${status} empty`}
          className="w-48 h-48 object-contain"
        />
        <p className="text-gray-600 text-lg">{text}</p>
        <AppButton label={buttonLabel} onClick={() => navigate(buttonHref)} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sellerProduct.map((item, index) => (
        <ListingCard
          key={index}
          id={item._id}
          status={status}
          title={`${item.title} - ${status}`}
          price={`$${item.price}`}
          image={item.coverImage}
        />
      ))}
    </div>
  );
};
