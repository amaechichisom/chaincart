import { useAbstraxionAccount, useAbstraxionClient, useAbstraxionSigningClient, useModal } from '@burnt-labs/abstraxion';
// import { useEffect } from 'react';

export default function useWallet() {
  const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();
  const { client: signingClient, signArb, logout } = useAbstraxionSigningClient();
  const { client: queryClient} = useAbstraxionClient();
  const [, setShow] = useModal();


  // useEffect(() => {
  //   console.log({ isConnected, isConnecting, bech32Address });
  //   // console.log({signingClient,signArb,logout})
  // }, [isConnected, isConnecting, bech32Address]);

  const openWalletModal = () => {
    setShow(true);
  };

  return { bech32Address, setShow, isConnected, isConnecting, signingClient, signArb, logout, queryClient, openWalletModal };
}
