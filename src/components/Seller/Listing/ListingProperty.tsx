import { CalendarIcon, EyeIcon, LandingOne } from "@/assets";
import { formatWithCommas } from "@/utils/convert";

interface ListingPropertyProps {
  src?: string;
  title?: string;
  price?: number;
  discountPrice?: number;
  discountPercentage?: number;
  date?: string;
  views?: number;
}

function ListingProperty({
  src,
  title,
  price,
  date,
  views,
}: ListingPropertyProps) {
  return (
    <div className="flex items-center justify-between w-full py-3 border-b border-neutral-200">
      <div className="flex items-center gap-3">
        <img
          src={src ?? LandingOne}
          alt="property"
          className="w-16 h-16 rounded-md object-cover"
        />
        <div className="flex flex-col items-start gap-2 min-w-0">
          <h2 className="text-black font-normal text-lg truncate max-w-xs">
            {title || "Not set"}
          </h2>
          <p className="text-neutral-600 font-medium text-xs flex gap-1 items-center flex-wrap">
            <span>
              <img src={CalendarIcon} alt="calendar" className="w-4 h-4 object-cover inline" />
            </span>
            Published: {date || "04-Dec-2021"}
            <span className="flex items-center gap-1 ml-2">
              <img src={EyeIcon} alt="views" className="w-4 h-4 object-cover inline" />
              Views: {views ?? 98}
            </span>
          </p>
          <div className="flex items-center gap-2 text-xs">
            <button className="text-neutral-500 border border-neutral-200 py-1 px-2 rounded hover:bg-neutral-100 transition">
              Delete Listing
            </button>
            <button className="text-neutral-500 border border-neutral-200 py-1 px-2 rounded hover:bg-neutral-100 transition">
              Edit Listing
            </button>
          </div>
        </div>
      </div>
      <button
        className="border-2 border-black text-black py-1 px-3 rounded-md font-medium bg-white min-w-[110px] text-sm"
        type="button"
      >
        {price !== undefined ? `$${formatWithCommas(price)}` : "$0"}
      </button>
    </div>
  );
}

export default ListingProperty;