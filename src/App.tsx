import { ILandListing } from "./@types/types";
import { useAllProductQuery } from "./api/prodService";
import ListCategory from "./components/Home/ListCategory";
import ListProperty from "./components/Home/ListProperty";
import HeroSection from "./components/shared/HeroSection";
import Loading from "./components/shared/Loading";
import {  landData, topCategories, topSellers } from "./CONSTANT/data";
// import useSetCart from "./hooks/useSetCart";
import PageSelection from '@/components/shared/PageSelection';
import { RootState, useAppSelector } from "./store";

function App() {
const { isLoading, data } = useAllProductQuery({});
const searchTerm = useAppSelector((state: RootState) => state.search.term);

if (isLoading) {
  return <Loading />;
}

const BestApertmetList = data?.data.products as ILandListing[];

const tempFiltered = BestApertmetList.filter((product) =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredProducts = tempFiltered.length > 0 ? tempFiltered : BestApertmetList;

  // useSetCart();
  return (
    <div className="space-y-8 px-2 lg:px-4">
      <HeroSection />
      
      <div className="py-2"></div>
      <ListProperty data={filteredProducts} title="Best deal in Apartments" link="/property/"/>
      {/* <ListProperty data={BestApertmetList} title="Best deal in Apartments" link="/property/"/> */}
      {/* <ListProperty data={apartmentData} title="Best deal in Apartments" link="/"/> */}
      <div className="py-3"></div>
      <ListCategory data={topCategories} title="Top Categories" link="/"/>
      <div className="py-3"></div>
      <ListCategory data={topSellers} title="Top Sellers" link="/"/>
      <div className="py-3"></div>
      <ListProperty data={BestApertmetList} title="New Collections" link="/"/>
      <div className="py-3"></div>
      <ListProperty data={landData} title="Special Offer in Lands" link="/"/>
      <div className="py-3"></div>
      <PageSelection/>
    
    </div>
  );
}

export default App;
