import { useBuyFromCartMutation } from "@/api/cartService";
import { useCallback, useState } from "react";
import { IApiResponse, IAvailableOrder, IXionTransact } from "@/@types/types";
import { confirmOrder } from "@/utils/orderConfirm";
// import { initEscrow } from "@/utils/escrowService";
import { useOrderAvailableMutation, useOrderPaymentConfirmMutation } from "@/api/orderService";
import { RootState, useAppSelector } from "@/store";
import { useToast } from "./useToast";
import { useSendToXionEscrowMutation } from "@/api/xionService";

export function useXionAction() {

  const [keepLoad, setKeepLoad] = useState(false);
  const [buyFromCart, { isLoading: buyLoad }] = useBuyFromCartMutation();
  const [orderConfirm, { isLoading: orderConfirmLoad }] = useOrderPaymentConfirmMutation();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const toast  = useToast();
  const [sendToEscrow,{isLoading:loadEscrow}]=useSendToXionEscrowMutation()
    const [quantity, setQuantity] = useState(1);
      const [orderAvailable, { isLoading: orderLoad }] = useOrderAvailableMutation();
    
  
    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const handleBuyFromXion = useCallback(async (productId: string, quantity: number) => {
    setKeepLoad(true);
  
    try {
      const response: IApiResponse = await buyFromCart({ productId, quantity }).unwrap();
  
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
  
        const escrowResponse: IApiResponse = await sendToEscrow({
          sellerAddress,
          amount: totalAmount.toString(),
        }).unwrap();
        console.log(escrowResponse)
        if (escrowResponse.status === 200) {
          const escrowConfirm = escrowResponse.data as IXionTransact;
          console.log({transactionHash:escrowConfirm.transactionHash})
          await confirmOrder(orderConfirm, productId, quantity, escrowConfirm.transactionHash);
          toast.success("Your order has been placed successfully.");
        } else {
          console.error("Escrow transaction failed. Order confirmation skipped.");
          toast.error("Escrow transaction could not be completed.");
        }
      } else {
        toast.error(response.message || "The selected item is not available for purchase.");
      }
    } catch (error) {
      console.error("Error processing purchase:", error);
      toast.error("An error occurred while processing your order.");
    } finally {
      setKeepLoad(false);
      toast.dismiss();
    }
  }, [buyFromCart, orderConfirm, user, toast]);
  
    const handleBuyXionOrder = useCallback(async (productId: string, quantity: number) => {
      try {
        setKeepLoad(true);
        const response: IApiResponse = await orderAvailable({ productId, quantity }).unwrap();
  
        if (response.status === 200) {
          toast.success(response.message || "Order available. Proceeding with payment...");
          const available = response.data as IAvailableOrder;
          const { totalAmount, sellerAddress } = available
  
          const confirmTransaction = window.confirm(
            `You are about to send ${totalAmount} Xion to the escrow. Do you want to proceed?`
          );
    
          if (!confirmTransaction) {
            toast.info("Transaction cancelled.");
            setKeepLoad(false);
            return;
          }
    
          const escrowResponse: IApiResponse = await sendToEscrow({
            sellerAddress,
            amount: totalAmount.toString(),
          }).unwrap();
          console.log(escrowResponse, "escrowResponse");
    
          if (escrowResponse.status === 200) {
            const escrowConfirm = escrowResponse.data as IXionTransact;
            console.log({transactionHash:escrowConfirm.transactionHash})
            await confirmOrder(orderConfirm, productId, quantity, escrowConfirm.transactionHash);
            toast.success("Your order has been placed successfully.");
          } else {
            console.error("Escrow transaction failed. Order confirmation skipped.");
            toast.error("Escrow transaction could not be completed.");
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
    }, [ quantity, orderAvailable, orderConfirm, user]);
  
  

  return {  
    orderLoad,
    quantity,
    increment,
    decrement,
    handleBuyFromXion, buyLoad, orderConfirmLoad, keepLoad ,loadEscrow,handleBuyXionOrder
}
}
