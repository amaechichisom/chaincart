import { useCallback, useState } from "react";
import AppButton from "../shared/AppButton";
import { Copy } from "lucide-react";
import { maskAddress } from "@/utils/maskAddress";
import { RootState, useAppSelector } from "@/store";
// import { cancelEscrow, releaseFunds } from "@/utils/escrowService";
import { IApiResponse, IUserOrderHistory } from "@/@types/types";
import { useUpdateOrderStatusMutation } from "@/api/orderService";
import { useToast } from "@/hooks/useToast";
// import { useMetaAction } from "@/hooks/useMetaAction";
import useMeta from "@/hooks/useMeta";

interface HistoryCardProps {
  purchase: IUserOrderHistory;
  showActions?: boolean;
}

export default function HistoryCard({
  purchase,
  showActions = false,
}: HistoryCardProps) {
  const [copied, setCopied] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [releaseorCancelFund, { isLoading }] = useUpdateOrderStatusMutation();
   const toast  = useToast();
  const {releaseOrCancelFund} = useMeta()


const handleEscrowAction = useCallback(async (action: "release" | "cancel") => {
  console.log("🧠 Button was clicked. Escrow action starting...", action);

  toast.dismiss();

  const loadingToast = toast.loading(`${action} to wallet...`);
  try {
    if (!user?.walletAddress) {
      toast.dismiss(loadingToast);
      toast.error("Wallet address is required to release funds.");
      return;
    }

    const confirmTransaction = window.confirm(
      `You are about to ${action} Xion to the seller. Do you want to proceed?`
    );

    if (!confirmTransaction) {
      toast.dismiss(loadingToast);
      toast.info("Transaction cancelled.");
      return;
    }

    const releaseFundResult = await releaseOrCancelFund(user.walletAddress, action);
    if (releaseFundResult?.transactionHash) {
      const response: IApiResponse = await releaseorCancelFund({
        status: action,
        orderId: purchase._id,
      }).unwrap();
      toast.success(response.message);
    } else {
      toast.dismiss(loadingToast);
      toast.error(`Error!! Failed to ${action} funds. Please try again.`);
    }
  } catch (error) {
    toast.dismiss(loadingToast);
    console.error("Error releasing funds:", error);
  } finally {
    toast.dismiss(loadingToast);
  }
}, [
  toast,
  user?.walletAddress,
  releaseOrCancelFund,
  releaseorCancelFund,
  purchase._id,
]);


  const { txHash, amount } = purchase.payment || {};

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div key={purchase._id} className="border p-4 rounded-lg shadow-lg w-full">
      <div className="flex items-center justify-between">
        <p className="text-gray-700 break-words">
          <strong>Transaction Hash:</strong> {maskAddress(txHash)}
        </p>
        <AppButton
          onClick={handleCopy}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
          rightIcon={<Copy size={16} />}
          label={copied ? "Copied!" : "Copy"}
          variant={copied ? "default" : "outline"}
        />
      </div>

      <p className="text-gray-700">
        <strong>Amount:</strong> {amount} XION
      </p>
      <p className="text-gray-700">
        <strong>Status:</strong> {purchase.status}
      </p>
      <p className="text-gray-700">
        <strong>Date:</strong> {new Date(purchase.createdAt).toLocaleString()}
      </p>

      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {purchase.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border p-2 rounded"
          >
            {item.product?.image_of_land && (
              <img
                src={item.product.image_of_land}
                alt="Product"
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}

            <div>
              <p className="font-semibold">Price: {item?.price} XION</p>
              <p>Quantity: {item.quantity}</p>
              {/* <p>Stock: {item.product?.stock}</p> */}
            </div>
          </div>
        ))}
      </div>

      {showActions && (
        <div className="mt-4 flex gap-4">
          <AppButton
            className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
            isLoading={isLoading}
            disabled={isLoading || !user?.walletAddress}
            onClick={() => handleEscrowAction("cancel")}
            label="Cancel Order"
          />

          <AppButton
            className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded"
            onClick={() => handleEscrowAction("release")}
            disabled={isLoading || !user?.walletAddress}
            label="Release Fund"
            isLoading={isLoading}
          />
        </div>
      )}

    </div>
  );
}
