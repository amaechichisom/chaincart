import { IProduct } from "@/@types/types";
import { Link } from "react-router-dom";

export interface ShopCardProps extends IProduct {
  price: number;
  discountPrice?: number;
  discount?: number;
  inStock: boolean;
}

export default function ShopCard({
  title,
  image_of_land,
  price,
  discountPrice,
  discount,
  stock,
  _id,
}: ShopCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white relative">
      {discount && (
        <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
          {discount}%
        </span>
      )}

      <img
        src={image_of_land}
        alt={title}
        className="w-full h-40 object-cover rounded-md"
      />

      <h3 className="text-sm font-semibold mt-2">{title}</h3>

      {stock > 0 ? (
        <p className="text-primary text-xs">IN STOCK {stock}</p>
      ) : (
        <p className="text-red-500 text-xs">OUT OF STOCK</p>
      )}

      <div className="flex items-center space-x-2 mt-2">
        {discountPrice ? (
          <>
            <p className="text-red-500 font-bold">${discountPrice}</p>
            <p className="line-through text-gray-400 text-sm">{price} XION</p>
          </>
        ) : (
          <p className="font-bold">{price} XION</p>
        )}
      </div>

      <Link
        to={`/shop/${_id}`}
        className="mt-3 block bg-border !text-black text-center py-2 rounded-md text-sm font-medium
         hover:!text-white hover:bg-primary transition ease-in-out duration-300"
      >
        View Details
      </Link>
    </div>
  );
}
