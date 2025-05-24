import { CalendarIcon, LandingOne } from "@/assets"


function ListingItem() {
  return (
    <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3 ">
            <img src={LandingOne} alt="land picture" className="w-16 h-16 rounded-md"  />
            <div className="flex flex-col items-start gap-2">
                <h2 className="text-black font-normal text-lg truncate">Mansion in South Lekki</h2>
                <p className="text-neutral-600 font-semibold text-sm flex gap-1 items-center">
                    <span><img src={CalendarIcon} alt="calendar" className="w-4 h-4 object-cover"/></span>
                    Published: 04-Dec-2021
                </p>
            </div>
        </div>

        <button className="border-2 border-neutral-500 text-neutral-600 py-1 px-2 rounded-md font-medium">View Details</button>
    </div>
  )
}

export default ListingItem