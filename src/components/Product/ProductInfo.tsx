import { IProduct } from "@/@types/types";
import AppButton from "../shared/AppButton";
import { useProductActions } from "@/hooks/useProductActions";
// import { useXionAction } from "@/hooks/useXionAction";
import { useMetaAction } from "@/hooks/useMetaAction";

interface ProductInfoProps extends IProduct {
  oldPrice?: number;
  rating?: number;
  description?: string;
  specialOfferEnds?: string
}

export default function ProductInfo({
  title,
  price,
  oldPrice,
  rating,
  description,
  _id,
  document_of_land,
}: ProductInfoProps) {
  const {  isAddingToCart,  handleAddToCart } = useProductActions(_id);
    // const {decrement,increment,quantity,orderConfirmLoad,orderLoad,keepLoad}=useXionAction()
    const {handleBuyMetaOrder,decrement,increment,keepLoad,orderConfirmLoad,orderLoad,quantity} = useMetaAction()
  return (
    <div className="w-full p-4 md:p-6 space-y-4">
      <h1 className="text-lg md:text-3xl font-bold">{title}</h1>
      <div className="flex items-center mt-2 space-x-2">
        {rating && <span className="text-yellow-500">⭐ {rating.toFixed(2)}</span>}
        <span className="text-gray-500">(2 reviews)</span>
      </div>
      {description && <p className="text-gray-600 text-sm md:text-base">{description}</p>}
      <div className="flex items-center space-x-3 mt-3">
        {price && <span className="text-red-500 font-bold text-lg md:text-xl">{price} XION</span>}
        {oldPrice && <span className="line-through text-gray-400">${oldPrice}</span>}
      </div>

      {document_of_land && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Product Document</h3>
          <iframe
            src={document_of_land}
            className="w-full h-[500px] border rounded-lg"
            title="Product Document"
          />
          <a href={document_of_land} target="_blank" rel="noopener noreferrer" className="!text-primary underline mt-2 block">
            Open Document in New Tab
          </a>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 border rounded-full p-2 w-full max-w-sm">
        <AppButton onClick={decrement} disabled={quantity === 0} label="-" />
        <span className="text-sm font-medium">{quantity}</span>
        <AppButton onClick={increment} label="+" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <AppButton label="Add To Cart" isLoading={isAddingToCart} onClick={handleAddToCart} disabled={quantity === 0} />
        <AppButton label="Buy Now" disabled={quantity === 0} onClick={()=>handleBuyMetaOrder(_id,quantity)} isLoading={orderLoad || orderConfirmLoad || keepLoad} />
      </div>
    </div>
  );
}
