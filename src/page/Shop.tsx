// import ShopBanner from "@/components/Shop/ShopBanner";
// import ShopFilters from "@/components/Shop/ShopFilters";
import ShopList from "@/components/Shop/ShopList";
import ShopPagination from "@/components/Shop/ShopPagination";
// import ShopSorting from "@/components/Shop/ShopSorting";

export default function Shop() {
  return (
    <div className=" container mx-auto">
      {/* <ShopFilters /> */}
      {/* <div className="flex-1">
        
      </div> */}
      {/* <ShopBanner /> */}
      {/* <ShopSorting /> */}
      <h2 className="text-2xl font-semibold my-6 ml-4">Best deal on Chaincart</h2>
      <ShopList />
      <ShopPagination/>
    </div>
  )
}
