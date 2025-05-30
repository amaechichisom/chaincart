import { useAbstraxionAccount, useAbstraxionClient, useAbstraxionSigningClient, useModal } from '@burnt-labs/abstraxion';
// import { useEffect } from 'react';

export default function useWallet() {
  const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();
  const { client: signingClient, signArb, logout } = useAbstraxionSigningClient();
  const { client: queryClient} = useAbstraxionClient();
  const [, setShow] = useModal();



  const openWalletModal = () => {
    setShow(true);
  };

  return { bech32Address, setShow, isConnected, isConnecting, signingClient, signArb, logout, queryClient, openWalletModal };
}
