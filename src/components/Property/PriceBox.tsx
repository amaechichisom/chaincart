import { useState } from "react";
import AppButton from "../shared/AppButton";
import { InputField } from "../shared/InputField";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RootState, useAppSelector } from "@/store";
import { useRequireWallet } from "@/hooks/useRequireWallet";
import { IApiResponse, IAvailableOrder } from "@/@types/types";
import { useToast } from "@/hooks/useToast";
import {
  useOrderAvailableMutation,
  useOrderPaymentConfirmMutation,
} from "@/api/orderService";
import useMeta from "@/hooks/useMeta";
import { useNavigate } from "react-router-dom";

export type IPriceBox = {
  price: number;
  id?: string;
  isSpecialOffer?: boolean;
};

export default function PriceBox({ price, isSpecialOffer, id }: IPriceBox) {
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [saveDetailsToProfile, setSaveDetailsToProfile] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { initEscrow } = useMeta();

  const [orderAvailable, { isLoading: orderLoad }] =
    useOrderAvailableMutation();
  const { connect } = useRequireWallet();
  const toast = useToast();
  const [confirmOrder, { isLoading: loadConfirm }] =
    useOrderPaymentConfirmMutation();

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const { email, fullName, phoneNumber } = userDetails;

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

    try {
      const response: IApiResponse = await orderAvailable({
        productId: id!,
        quantity: 1,
      }).unwrap();
      toast.dismiss(loadingToast);
      if (response.status === 200) {
        toast.success(
          response.message || "Order confirmed. Proceeding with payment..."
        );
        const available = response.data as IAvailableOrder;
        const { totalAmount, sellerAddress } = available;
        const confirmTransaction = window.confirm(
          `You are about to send ${totalAmount} Xion to the escrow. Do you want to proceed?`
        );
        if (!confirmTransaction) {
          toast.info("Transaction was cancelled.");

          return;
        }

        const escrowResult = await initEscrow(
          user!.walletAddress,
          totalAmount.toString(),
          sellerAddress
        );

        if (escrowResult && escrowResult.transactionHash) {
          const response: IApiResponse = await confirmOrder({
            productId: id!,
            quantity: 1,
            transactionHash: escrowResult.transactionHash,
            email,
            fullName,
            phoneNumber,
            saveDetailsToProfile,
          }).unwrap();
          const msg = `You will be notified via the provided email.`;
          toast.success(
            `${response.message} ${msg} ` ||
              `Payment successful! Order confirmed. ${msg}`
          );

          navigate("/");
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
      toast.dismiss(loadingToast);
      console.error("Error submitting form:", error);
      toast.error("Error Updating user deatils");
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <SpecialPrice price={price} isSpecialOffer={isSpecialOffer} />

      <AppButton
        className="w-full"
        label={
          !isAuthenticated
            ? "Please Connect Wallet"
            : showForm
            ? "Hide Form"
            : "Buy Now"
        }
        onClick={() =>
          !isAuthenticated ? connect() : setShowForm((prev) => !prev)
        }
      />

      {showForm && isAuthenticated && (
        <div className="mt-4 space-y-3">
          <form onSubmit={handleSubmit}>
            <InputField
              id="email"
              type="email"
              label="Email"
              placeholder="Enter email"
              required
              value={email}
              onChange={handleChange}
            />
            <InputField
              id="phoneNumber"
              type="tel"
              label="Phone Number"
              placeholder="Enter phone number"
              required
              value={phoneNumber}
              onChange={handleChange}
            />
            <InputField
              id="fullName"
              label="Full Name"
              placeholder="Enter full name"
              required
              value={fullName}
              onChange={handleChange}
            />
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="saveDetailsToProfile"
                checked={saveDetailsToProfile}
                onCheckedChange={(val) => setSaveDetailsToProfile(Boolean(val))}
              />
              <Label htmlFor="saveDetailsToProfile">
                Save these details to my profile for future purchases
              </Label>
            </div>

            <AppButton
              label="Continue to Agreement"
              type="submit"
              className="mt-2 w-full"
              disabled={loadConfirm || orderLoad}
            />
          </form>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Confirm Purchase Agreement</DialogTitle>
            <DialogDescription>
              Please read and agree to the terms below before continuing.
            </DialogDescription>
          </DialogHeader>

          <div className="text-sm text-gray-700 space-y-3 max-h-60 overflow-auto">
            <p>
              Chaincart performs thorough due diligence for all listed
              properties, including on-site inspections and document
              verification.
            </p>
            <p>
              All post-purchase communications will be securely handled via
              email.
            </p>
            <p>
              Ownership rights and legal documents will be officially
              transferred after payment and identity verification.
            </p>
            <p>
              By proceeding, you confirm that you have read, understood, and
              agree to the terms above.
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="agreement"
              checked={isAgreementChecked}
              onCheckedChange={(val) => setIsAgreementChecked(Boolean(val))}
            />
            <Label htmlFor="agreement">
              I have read and agree to the terms above.
            </Label>
          </div>

          <DialogFooter>
            <AppButton
              label="Confirm & Pay"
              onClick={confirmAgreement}
              disabled={!isAgreementChecked || orderLoad || loadConfirm}
              className="w-full"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function SpecialPrice({ price, isSpecialOffer = false }: IPriceBox) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">
        ${price.toLocaleString()}
      </h2>

      {isSpecialOffer && (
        <div className="mb-3">
          <p className="text-sm font-medium text-blue-600 mb-1">
            Special offer:
          </p>
          <div className="flex gap-2 text-xs text-white">
            <div className="bg-blue-500 px-2 py-1 rounded">4d</div>
            <div className="bg-blue-500 px-2 py-1 rounded">23h</div>
            <div className="bg-blue-500 px-2 py-1 rounded">25m</div>
          </div>
        </div>
      )}
    </section>
  );
}
