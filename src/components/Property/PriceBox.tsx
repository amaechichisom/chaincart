import { usePriceBox } from "./hooks/usePriceBox";
import { SpecialPrice } from "./SpecialPrice";
import AppButton from "../shared/AppButton";
import { PriceForm } from "./PriceForm";
import { PurchaseAgreementModal } from "./PurchaseAgreementModal";
import useWallet from "../Wallet/useWallet";

export type IPriceBox = {
  price?: number;
  id?: string;
  isSpecialOffer?: boolean;
};

export default function PriceBox({ price, isSpecialOffer, id }: IPriceBox) {
  const {
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
    isLoading,
  } = usePriceBox(id);
  
  const {isConnected,openWalletModal} = useWallet()
  const connect = () => {
    openWalletModal(); 
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <SpecialPrice price={price} isSpecialOffer={isSpecialOffer} />
      <AppButton
        className="w-full"
        label={
          !isConnected ? "Sign In" : showForm ? "Hide Form" : "Buy Now"
        }
        onClick={() =>
          !isConnected ? connect() : setShowForm((prev) => !prev)
        }
      />
      {showForm && isConnected && (
        <PriceForm
          email={userDetails.email}
          phoneNumber={userDetails.phoneNumber}
          fullName={userDetails.fullName}
          saveDetailsToProfile={saveDetailsToProfile}
          onChange={handleChange}
          onCheckboxChange={setSaveDetailsToProfile}
          onSubmit={handleSubmit}
          disabled={isLoading}
        />
      )}
      <PurchaseAgreementModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        isAgreementChecked={isAgreementChecked}
        onAgreementToggle={setIsAgreementChecked}
        onConfirm={confirmAgreement}
        disabled={isLoading}
      />
    </div>
  );
}
