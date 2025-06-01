import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState, useAppSelector } from "@/store";
import { useToast } from "@/hooks/useToast";
import useMeta from "@/hooks/useMeta";
import {
  useOrderAvailableMutation,
  useOrderPaymentConfirmMutation,
} from "@/api/orderService";
import { useAuthCheckOutQuery } from "@/api/authService";
import { AuthResponse, IApiResponse, IAvailableOrder } from "@/@types/types";

export function usePriceBox(id?: string) {
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [saveDetailsToProfile, setSaveDetailsToProfile] = useState(false);
    const [keepLoad, setKeepLoad] = useState(false);

  const {  user } = useAppSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const walletAddress = user?.walletAddress;

  const toast = useToast();
  const { initEscrow } = useMeta();

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const { email, fullName, phoneNumber } = userDetails;

  const { isLoading: checkLoad, data: checkData } = useAuthCheckOutQuery(
    walletAddress ?? "",
    { skip: !walletAddress }
  );


  useEffect(() => {
    const successResponse = checkData?.data as AuthResponse;
    console.log({successResponse})
    if (successResponse) {
      setUserDetails({
        fullName: successResponse?.user?.profile.name ?? "",
        email: successResponse?.user?.email ?? "",
        phoneNumber: successResponse?.user?.phoneNumber ?? "",
      });
    }
  }, [checkData]);

  const [orderAvailable, { isLoading: orderLoad }] =
    useOrderAvailableMutation();
  const [confirmOrder, { isLoading: loadConfirm }] =
    useOrderPaymentConfirmMutation();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsModalOpen(true);
  }

  async function confirmAgreement() {
    if (!isAgreementChecked) return;
    const loadingToast = toast.loading("Processing your payment...");
    setIsModalOpen(false);
          setKeepLoad(true);

    try {
      const response: IApiResponse = await orderAvailable({
        productId: id!,
        quantity: 1,
      }).unwrap();

      toast.dismiss(loadingToast);

      if (response.status === 200) {
        const available = response.data as IAvailableOrder;
        const confirm = window.confirm(
          `You are about to send ${available.totalAmount} Xion to escrow. Proceed?`
        );
        if (!confirm) return toast.info("Transaction cancelled.");

        const escrowResult = await initEscrow(
          user!.walletAddress,
          available.totalAmount.toString(),
          available.sellerAddress
        );

        if (escrowResult?.transactionHash) {
          const confirmRes: IApiResponse = await confirmOrder({
            productId: id!,
            quantity: 1,
            transactionHash: escrowResult.transactionHash,
            email,
            fullName,
            phoneNumber,
            saveDetailsToProfile,
          }).unwrap();
          toast.success(`${confirmRes.message} You will be notified via email.`);
          navigate("/");
        } else {
          toast.error("Payment failed. Please try again.");
        }
      } else {
        toast.error(response.message || "Order unavailable.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error submitting order.");
    }  finally {
      toast.dismiss();
      setKeepLoad(false);
    }
  }

  return {
    showForm,
    setShowForm,
    isModalOpen,
    setIsModalOpen,
    isAgreementChecked,
    setIsAgreementChecked,
    saveDetailsToProfile,
    setSaveDetailsToProfile,
    userDetails,
    handleChange,
    handleSubmit,
    confirmAgreement,
    
    isLoading: checkLoad || orderLoad || loadConfirm || keepLoad,
  };
}
