import { useBuyFromCartMutation } from "@/api/cartService";
import { useCallback, useState } from "react";
import { IApiResponse, IAvailableOrder } from "@/@types/types";
import { confirmOrder } from "@/utils/orderConfirm";
import {
  useOrderAvailableMutation,
  useOrderPaymentConfirmMutation,
} from "@/api/orderService";
import { RootState, useAppSelector } from "@/store";
import { useToast } from "./useToast";
import useMeta from "./useMeta";

export function useMetaAction() {
  const [keepLoad, setKeepLoad] = useState(false);
  const [buyFromCart, { isLoading: buyLoad }] = useBuyFromCartMutation();
  const [orderConfirm, { isLoading: orderConfirmLoad }] =
    useOrderPaymentConfirmMutation();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const toast = useToast();
  const { initEscrow } = useMeta();
  const [quantity, setQuantity] = useState(1);
  const [orderAvailable, { isLoading: orderLoad }] =
    useOrderAvailableMutation();

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const handleBuyFromMeta = useCallback(
    async (productId: string, quantity: number) => {
      setKeepLoad(true);
      
      console.log({ productId }, "from handleBuyFromMeta");
      try {
        const response: IApiResponse = await buyFromCart({
          productId,
          quantity,
        }).unwrap();

        if (response.status === 200) {
          toast.success(response.message || "Proceeding with payment...");
          const available = response.data as IAvailableOrder;
          const { totalAmount, sellerAddress } = available;
          const confirmTransaction = window.confirm(
            `You are about to send ${totalAmount} Xion to the escrow. Do you want to proceed?`
          );
          if (!confirmTransaction) {
            toast.info("Transaction cancelled.");
            setKeepLoad(false);
            return;
          }
          const escrowResult = await initEscrow(
            user!.walletAddress,
            totalAmount.toString(),
            sellerAddress
          );

          if (escrowResult && escrowResult.transactionHash) {
            toast.success("Payment successfully.");
            await confirmOrder(
              orderConfirm,
              productId,
              quantity,
              escrowResult.transactionHash
            );
            toast.success("Your order has been placed successfully.");
          } else {
            console.error(
              "Escrow transaction failed. Order confirmation skipped."
            );
            toast.error("Escrow transaction could not be completed.");
          }
        } else {
          toast.error(
            response.message ||
              "The selected item is not available for purchase."
          );
        }
      } catch (error) {
        console.error("Error processing purchase:", error);
        toast.error("An error occurred while processing your order.");
      } finally {
        setKeepLoad(false);
        toast.dismiss();
      }
    },
    [buyFromCart, orderConfirm, user, initEscrow]
  );

  const handleBuyMetaOrder = useCallback(
    async (productId: string, quantity: number) => {
      try {
        setKeepLoad(true);
        const response: IApiResponse = await orderAvailable({
          productId,
          quantity,
        }).unwrap();

        if (response.status === 200) {
          toast.success(
            response.message || "Order available. Proceeding with payment..."
          );
          const available = response.data as IAvailableOrder;
          const { totalAmount, sellerAddress } = available;
          const confirmTransaction = window.confirm(
            `You are about to send ${totalAmount} Xion to the escrow. Do you want to proceed?`
          );
          if (!confirmTransaction) {
            toast.info("Transaction cancelled.");
            setKeepLoad(false);
            return;
          }

          const escrowResult = await initEscrow(
            user!.walletAddress,
            totalAmount.toString(),
            sellerAddress
          );

          if (escrowResult && escrowResult.transactionHash) {
            await confirmOrder(
              orderConfirm,
              productId,
              quantity,
              escrowResult.transactionHash
            );
            toast.success("Payment successful! Order confirmed.");
          } else {
            console.error(
              "Escrow transaction failed. Order confirmation skipped."
            );
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
    },
    [orderAvailable, orderConfirm, user, initEscrow]
  );

  return {
    orderLoad,
    quantity,
    increment,
    decrement,
    handleBuyFromMeta,
    buyLoad,
    orderConfirmLoad,
    keepLoad,
    handleBuyMetaOrder,
  };
}
