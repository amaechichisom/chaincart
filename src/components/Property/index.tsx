import { apartmentData } from "@/CONSTANT/data";
import ListProperty from "../Home/ListProperty";
import ImageCollage from "../shared/ImageCollage";
import PriceBox from "./ PriceBox";
import PropertyDescription from "./PropertyDescription";
import PropertyInfo from "./PropertyInfo";

export default function PropertyDetail() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <ImageCollage />
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start gap-3 my-10">
        <div className="col-span-2 ">
          <PropertyInfo />
          <PropertyDescription />
        </div>
        <PriceBox />
      </div>
      <div className="py-2"></div>
      <ListProperty
        data={apartmentData}
        title="Other Properties Nearby"
        link="/"
      />
      <div className="py-2"></div>
      <ListProperty data={apartmentData} title="Near you" link="/" />
    </section>
  );
}
