import { BestSeller } from "./components/Home/BestSeller";
import Category from "./components/Home/Category";
import Deal from "./components/Home/Deal";
import Finished from "./components/Home/Finished";
import Promo from "./components/Home/Promo";
import Sponsor from "./components/Home/Sponsor";
import SuperDiscount from "./components/Home/SuperDiscount";
import HeroSection from "./components/shared/HeroSection";
import useSetCart from "./hooks/useSetCart";

function App() {
  useSetCart();
  return (
    <div className="space-y-8">
      <HeroSection />
      <Category/>
      <Deal/>
      <Promo/>
      <BestSeller/>
      <SuperDiscount/>
      <Finished/>
      <Sponsor/>
    </div>
  );
}

export default App;
