import { Abstraxion } from "@burnt-labs/abstraxion";
import { useRequireWallet } from "@/hooks/useRequireWallet";
import AppButton from "../shared/AppButton";
import { maskAddress } from "@/utils/maskAddress";
import Loading from "../shared/Loading";

const XionWallet = () => {
  const {
    openWalletModal,
    disconnect,
    bech32Address,
    isConnecting,
    isLoading,
  } = useRequireWallet();

  if (isConnecting || isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <AppButton
        textStyle="text-sm"
        isLoading={isLoading}
        label={bech32Address ? `${maskAddress(bech32Address)}` : "Sign In"}
        onClick={openWalletModal}
      />
      <Abstraxion onClose={disconnect} />
    </section>
  );
};

export default XionWallet;
