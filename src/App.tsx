
// import { BestSeller } from "./components/Home/BestSeller";
// import Category from "./components/Home/Category";
// import Deal from "./components/Home/Deal";
// import Finished from "./components/Home/Finished";
// import Promo from "./components/Home/Promo";
// import Sponsor from "./components/Home/Sponsor";
// import SuperDiscount from "./components/Home/SuperDiscount";
// import Team from "./components/Home/Team";
import ListCategory from "./components/Home/ListCategory";
import ListProperty from "./components/Home/ListProperty";
import HeroSection from "./components/shared/HeroSection";
import { apartmentData, landData, topCategories, topSellers } from "./CONSTANT/data";
import useSetCart from "./hooks/useSetCart";
import PageSelection from '@/components/shared/PageSelection';

function App() {
  useSetCart();
  return (
    <div className="space-y-8 px-2 lg:px-4">
      <HeroSection />
      <div className="py-2"></div>
      <ListProperty data={apartmentData} title="Best deal in Apartments" link="/"/>
      <div className="py-3"></div>
      <ListCategory data={topCategories} title="Top Categories" link="/"/>
      <div className="py-3"></div>
      <ListCategory data={topSellers} title="Top Sellers" link="/"/>
      <div className="py-3"></div>
      <ListProperty data={apartmentData} title="New Collections" link="/"/>
      <div className="py-3"></div>
      <ListProperty data={landData} title="Special Offer in Lands" link="/"/>
      <div className="py-3"></div>
      <PageSelection/>
      
      {/* <Category/>
      <Deal/>
      <Promo/>
      <BestSeller/>
      <SuperDiscount/>
      <Finished/>
      <Sponsor/>
      <Team/> */}
    </div>
  );
}

export default App;
