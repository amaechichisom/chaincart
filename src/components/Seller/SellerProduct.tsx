import {SpecialPrice} from "../Property/PriceBox";
import PropertyDescription from "../Property/PropertyDescription";
import PropertyInfo from "../Property/PropertyInfo";
import ImageCollage from "../shared/ImageCollage";

export default function SellerProduct() {
  return (
       <section className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <ImageCollage />
<div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start gap-3 my-10">
        <div className="col-span-2 ">
          <PropertyInfo />
          <PropertyDescription />
        </div>
        <SpecialPrice />
      </div>
       </section>
  )
}
