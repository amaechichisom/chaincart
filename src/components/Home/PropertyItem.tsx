import { Link } from "react-router-dom";
import { ApartmentOne } from '@/assets';
import { ILandListing } from "@/@types/types";

// interface PropertyItemProps {
//   src?: string;
//   title?: string;
//   price?: number;
//   discountPrice?: number;
//   discountPercentage?: number;
//   id?: string; 
// }

function PropertyItem({ _id,coverImage,percentage,title,price,specialOfferPrice}: ILandListing) {
  console.log(percentage);
  const content = (
    <div className="flex flex-col items-start justify-center gap-2 bg-white shadow-md rounded-lg p-1 pb-3 w-full max-w-xs sm:max-w-[200px] md:max-w-56 max-h-64 h-auto mx-auto lg:mx-0">
      <div className="relative w-full h-32 sm:h-36 md:h-40">
        <img
          src={coverImage ?? ApartmentOne}
          alt="Property"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        {/* {percentage && (
          <p className="absolute top-2 right-2 bg-[#E0F3FE] text-primary text-xs px-2 py-1 rounded-2xl font-semibold">
            {percentage}% OFF
          </p>
        )} */}
      </div>

      <p className="font-semibold text-xs sm:text-sm text-neutral-900 px-2 truncate w-full">
        {title || 'Not set'}
      </p>
      <div className="flex items-center justify-between w-full px-2">
        <p className="font-semibold text-xs sm:text-sm text-neutral-500">
          ${price || 'Not set'}
        </p>
        {specialOfferPrice && (
          <p className="font-light text-xs text-neutral-500 line-through">
            ${specialOfferPrice || 'Not set'}
          </p>
        )}
      </div>
    </div>
  );

  return _id ? (
    <Link to={`${_id}`}>
      {content}
    </Link>
  ) : (
    content
  );
}

export default PropertyItem;
