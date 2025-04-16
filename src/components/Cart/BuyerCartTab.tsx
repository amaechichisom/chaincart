import { Card, CardContent } from "@/components/ui/card";
import AppButton from "../shared/AppButton";
import { useCartActions } from "@/hooks/useCartActions";
import { useState, useEffect } from "react";
import CartItemCard from "./CartItemCard";
import useSetCart from "@/hooks/useSetCart";
import { useAppDispatch } from "@/store";
import { setQuantity as setQuantityFromReducer } from "@/features/cartSlice";
import { useMetaAction } from "@/hooks/useMetaAction";

export default function BuyerCartTab() {
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>(
    {}
  );
  const dispatch = useAppDispatch();

  const { cart } = useSetCart();

  useEffect(() => {
    if (!cart?.items) return;
    const initialQuantities: Record<string, number> = {};
    cart.items.forEach((item) => {
      initialQuantities[item._id] = item.quantity;
    });

    setItemQuantities(initialQuantities);
  }, [cart?.items.length]);
  // }, [JSON.stringify(cart?.items)]);

  const {
    handleRemoveCart,
    handleClearCart,
    removeLoad,
    deleteLoad,
    // handleBuyFromCart,
    // buyLoad,
    // orderConfirmLoad,
    // keepLoad,
    // buyLoading
  } = useCartActions();
  // ,orderLoad,orderConfirmLoad,keepLoad
  const { handleBuyFromMeta, buyLoad, orderConfirmLoad, keepLoad } =
    useMetaAction();

  const incrementItem = (itemId: string) => {
    setItemQuantities((prev) => {
      const updatedQuantity = (prev[itemId] || 0) + 1;
      return {
        ...prev,
        [itemId]: updatedQuantity,
      };
    });

    dispatch(
      setQuantityFromReducer({
        _id: itemId,
        quantity: itemQuantities[itemId] + 1 || 1,
      })
    );
  };

  const decrementItem = (itemId: string) => {
    setItemQuantities((prev) => {
      const updatedQuantity = Math.max(1, (prev[itemId] || 1) - 1);
      return {
        ...prev,
        [itemId]: updatedQuantity,
      };
    });

    dispatch(
      setQuantityFromReducer({
        _id: itemId,
        quantity: Math.max(1, itemQuantities[itemId] - 1 || 1),
      })
    );
  };

  const calculateItemTotal = (itemId: string, price: number) => {
    const quantity = itemQuantities[itemId] || 1;
    return price * quantity;
  };

  const calculateCartTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + calculateItemTotal(item._id, item.price);
    }, 0);
  };

  return (
    <div className="w-full mx-auto py-4">
      <Card>
        <CardContent>
          {cart.items.length > 0 ? (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItemCard
                  key={item._id}
                  item={item}
                  itemQuantities={itemQuantities}
                  incrementItem={incrementItem}
                  decrementItem={decrementItem}
                  handleBuyFromCart={handleBuyFromMeta}
                  // handleBuyFromCart={handleBuyFromXion}
                  // handleBuyFromCart={handleBuyFromCart}
                  handleRemoveCart={handleRemoveCart}
                  buyLoad={buyLoad}
                  orderConfirmLoad={orderConfirmLoad}
                  keepLoad={keepLoad}
                  removeLoad={removeLoad}
                  // buyLoading={buyLoading}
                />
              ))}

              <div className="flex justify-between items-center pt-4">
                <span className="text-xl font-bold">
                  Total: ${calculateCartTotal()}
                </span>
                <AppButton
                  disabled={true}
                  onClick={() => {}}
                  className="px-6 py-2"
                  label="Checkout"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <AppButton
                  onClick={() => handleClearCart(cart._id)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700"
                  label="Delete All"
                  isLoading={deleteLoad}
                />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
