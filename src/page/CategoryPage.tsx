import { ILandListing } from "@/@types/types";
import { useAllProductQuery } from "@/api/prodService";
import Category from "@/components/Category";
import Loading from "@/components/shared/Loading";
import { RootState, useAppSelector } from "@/store";
import { useLocation } from "react-router-dom";

export const CategoryExtract = [
  { _id: "683eb6103da2b19f5066e093", name: "Apartment" },
  { _id: "683eb6103da2b19f5066e095", name: "Flat" },
  { _id: "683eb6103da2b19f5066e096", name: "Land" },
  { _id: "683eb6103da2b19f5066e098", name: "Duplex" },
  { _id: "683eb6103da2b19f5066e094", name: "Bungalow" },
  { _id: "683eb6103da2b19f5066e09c", name: "Bedsitter" },
  { _id: "683c4a3cff2be395333cc06b", name: "Studio Apartment" },
  { _id: "683eb6103da2b19f5066e09b", name: "High-Rise" },
  { _id: "683eb6103da2b19f5066e097", name: "Mini-Flat" },
  { _id: "683eb6103da2b19f5066e099", name: "Townhouse/Terrace" },
];

export default function CategoryPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search");

  const filterbyname = CategoryExtract.find(
    (value) => value.name.toLowerCase() === search?.toLowerCase()
  );


  const shouldSkipCategory = !search || search === "0" || !filterbyname;

  const { isLoading, data } = useAllProductQuery(
    { category: shouldSkipCategory ? undefined : filterbyname._id },
    { skip: false }
  );

  const searchTerm = useAppSelector((state: RootState) => state.search.term);

  const BestApertmetList = (data?.data.products ?? []) as ILandListing[];

  const tempFiltered = BestApertmetList.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts =
    tempFiltered.length > 0 ? tempFiltered : BestApertmetList;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 container mx-auto space-y-4">
      <div className="text-sm text-gray-500">
        Name: {filterbyname?.name || "All"} <br />
        Search Query: {search}
      </div>
      <Category filteredProducts={filteredProducts} />
    </div>
  );
}

