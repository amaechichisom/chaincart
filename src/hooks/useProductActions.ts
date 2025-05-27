import { useState, useCallback, useMemo } from "react";
import { IApiResponse, IAvailableOrder } from "@/@types/types";
import { useAddToCartMutation } from "@/api/cartService";
import { useOrderAvailableMutation, useOrderPaymentConfirmMutation } from "@/api/orderService";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { confirmOrder } from "@/utils/orderConfirm";
import { initEscrow } from "@/utils/escrowService";
import { useToast } from "./useToast";
import { addToCart as addToCartReducer } from '@/features/cartSlice'; 

export const useProductActions = (_id: string) => {
  const [quantity, setQuantity] = useState(1);
  const [keepLoad, setKeepLoad] = useState(false);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const [addToCart, { isLoading }] = useAddToCartMutation();
  const [orderAvailable, { isLoading: orderLoad }] = useOrderAvailableMutation();
  const [orderConfirm, { isLoading: orderConfirmLoad }] = useOrderPaymentConfirmMutation();

  const { user } = useAppSelector((state: RootState) => state.auth);

  const isAddingToCart = useMemo(() => isLoading, [isLoading]);

  const handleAddToCart = useCallback(async () => {
    try {
      const response: IApiResponse = await addToCart({ quantity, productId: _id }).unwrap();
      dispatch(addToCartReducer({ _id }));  
      toast.success(response.message || "Added to cart successfully!");
      
    } catch (error: unknown) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart.");
    }
  }, [_id, quantity, addToCart]);

  const handleBuyOrder = useCallback(async () => {
    try {
      setKeepLoad(true);
      const response: IApiResponse = await orderAvailable({ productId: _id, quantity }).unwrap();

      if (response.status === 200) {
        toast.success(response.message || "Order available. Proceeding with payment...");
        const available = response.data as IAvailableOrder;
        const { totalAmount, sellerAddress } = available;

        const escrowResult = await initEscrow(
          user!.walletAddress,
          totalAmount.toString(),
          sellerAddress
        );

        if (escrowResult && escrowResult.transactionHash) {
          await confirmOrder(orderConfirm, _id, quantity, escrowResult.transactionHash);
          toast.success("Payment successful! Order confirmed.");
        } else {
          console.error("Escrow transaction failed. Order confirmation skipped.");
          toast.error("Payment failed. Please try again.");
        }
      } else {
        console.log("Order availability response:", response);
        toast.error(response.message || "Order unavailable.");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("An error occurred while processing your order.");
    } finally {
      toast.dismiss();
      setKeepLoad(false);
    }
  }, [_id, quantity, orderAvailable, orderConfirm, user]);

  return {
    quantity,
    increment,
    decrement,
    isAddingToCart,
    orderLoad,
    orderConfirmLoad,
    handleAddToCart,
    handleBuyOrder,
    keepLoad,
  };
};
