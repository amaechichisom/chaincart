import { Abstraxion } from "@burnt-labs/abstraxion";
import { useCallback, useEffect, useRef } from "react";
import useWallet from "./useWallet";
import { useWalletAuthMutation } from "@/api/authService";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { useToast } from "@/hooks/useToast";
import { IApiResponse, IUserResponse } from "@/@types/types";
import { setAuthenticated } from "@/features/authSlice";
import AuthStore from "@/utils/AuthStore";
import { Button } from "../ui/button";
import AppButton from "../shared/AppButton";
import { maskAddress } from "@/utils/maskAddress";
import Loading from "../shared/Loading";

const XionWallet = () => {
  const { 
    setShow, 
    bech32Address, 
    isConnected, 
    isConnecting,
    logout 
  } = useWallet();
  
  const [walletAuth, { isLoading }] = useWalletAuthMutation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const toast = useToast();
  const authInProgress = useRef(false);

  const handleAuth = useCallback(async () => {
    if(authInProgress.current) return;
    if (!bech32Address) return;

    authInProgress.current = true;
    toast.dismiss();
    const loadingToast = toast.loading("Authenticating wallet...");

    try {
      const response: IApiResponse = await walletAuth({
        walletAddress: bech32Address,
      }).unwrap();

      toast.dismiss(loadingToast);

      if (response.status === 200) {
        const successResponse = response.data as IUserResponse;
        dispatch(
          setAuthenticated({
            isAuthenticated: true,
            user: {
              id: successResponse.accessToken,
              roles: successResponse.result!.role,
              walletAddress: successResponse.result!.walletAddress,
            },
          })
        );
        AuthStore.setAccessToken(successResponse.accessToken);
        toast.success("Wallet connected successfully!");
      } else {
        toast.error(response.message || "Authentication failed", {
          action: (
            <Button onClick={handleAuth} variant="outline" size="sm">
              Retry
            </Button>
          ),
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Wallet authentication failed. Please try again.", {
        action: (
          <Button onClick={handleAuth} variant="outline" size="sm">
            Retry
          </Button>
        ),
      });
      console.error("Wallet Auth Error:", error);
    } finally {
      authInProgress.current = false;
    }
  }, [bech32Address, walletAuth, dispatch, toast]);

  const handleConnect = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const handleDisconnect = useCallback(() => {
    logout?.();
    AuthStore.removeAccessToken();
    dispatch(setAuthenticated({ isAuthenticated: false, user: null }));
    setShow(false);
    toast.success("Wallet disconnected successfully.");
  }, [logout, dispatch, toast, setShow]);
  
  useEffect(()=>{
    console.log({isConnected, isConnecting, bech32Address, isAuthenticated, authInProgress: authInProgress.current})
  },[isConnected, isConnecting, bech32Address, isAuthenticated]);
  
  useEffect(() => {
    if (isConnected && !isConnecting && bech32Address && !isAuthenticated) {
      handleAuth();
    }

    if (!isConnected && isAuthenticated && !isConnecting) {
      handleDisconnect();
    }
  }, [isConnected, isConnecting, bech32Address, isAuthenticated, handleAuth, handleDisconnect]);

  if (isConnecting || isLoading) {
    return <Loading/>;
  }

  return (
    <section>
      <AppButton
        isLoading={isLoading}
        label={
          bech32Address
            ? `VIEW ACCOUNT ${maskAddress(bech32Address)}`
            : "CONNECT XION WALLET"
        }
        onClick={handleConnect}
      />
      <Abstraxion 
        onClose={() => setShow(false)} 
      />
    </section>
  );
};

export default XionWallet;

// import { Abstraxion } from "@burnt-labs/abstraxion";
// import { useCallback, useEffect } from "react";
// import useWallet from "./useWallet";
// import { useWalletAuthMutation } from "@/api/authService";
// import { RootState, useAppDispatch, useAppSelector } from "@/store";
// import { useToast } from "@/hooks/useToast";
// import { IApiResponse, IUserResponse } from "@/@types/types";
// import { setAuthenticated } from "@/features/authSlice";
// import AuthStore from "@/utils/AuthStore";
// import { Button } from "../ui/button";
// import AppButton from "../shared/AppButton";
// import { maskAddress } from "@/utils/maskAddress";
// import Loading from "../shared/Loading";

// const XionWallet = () => {
//   const { 
//     setShow, 
//     bech32Address, 
//     isConnected, 
//     isConnecting,
//     logout 
//   } = useWallet();
  
//   const [walletAuth, { isLoading }] = useWalletAuthMutation();
//   const dispatch = useAppDispatch();
//   const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
//   const toast = useToast();

//   const handleAuth = useCallback(async () => {
//     if (!bech32Address) return;

//     toast.dismiss();
//     const loadingToast = toast.loading("Authenticating wallet...");

//     try {
//       const response: IApiResponse = await walletAuth({
//         walletAddress: bech32Address,
//       }).unwrap();

//       toast.dismiss(loadingToast);

//       if (response.status === 200) {
//         const successResponse = response.data as IUserResponse;
//         dispatch(
//           setAuthenticated({
//             isAuthenticated: true,
//             user: {
//               id: successResponse.accessToken,
//               roles: successResponse.result!.role,
//               walletAddress: successResponse.result!.walletAddress,
//             },
//           })
//         );
//         AuthStore.setAccessToken(successResponse.accessToken);
//         toast.success("Wallet connected successfully!");
//       } else {
//         toast.error(response.message || "Authentication failed", {
//           action: (
//             <Button onClick={handleAuth} variant="outline" size="sm">
//               Retry
//             </Button>
//           ),
//         });
//       }
//     } catch (error) {
//       toast.dismiss(loadingToast);
//       toast.error("Wallet authentication failed. Please try again.", {
//         action: (
//           <Button onClick={handleAuth} variant="outline" size="sm">
//             Retry
//           </Button>
//         ),
//       });
//       console.error("Wallet Auth Error:", error);
//     }
//   }, [bech32Address, walletAuth, dispatch, toast]);

//   const handleConnect = useCallback(() => {
//     setShow(true);
//   }, [setShow]);

//   const handleDisconnect = useCallback(() => {
//     logout?.();
//     AuthStore.removeAccessToken();
//     dispatch(setAuthenticated({ isAuthenticated: false, user: null }));
//     setShow(false);
//     toast.success("Wallet disconnected successfully.");
//   }, [logout, dispatch, toast, setShow]);

//   useEffect(() => {
//     if (isConnected && !isConnecting && bech32Address && !isAuthenticated) {
//       handleAuth();
//     }

//     if (!isConnected && isAuthenticated && !isConnecting) {
//       handleDisconnect();
//     }
//   }, [isConnected, isConnecting, bech32Address, isAuthenticated, handleAuth, handleDisconnect]);

//   if (isConnecting || isLoading) {
//     return <Loading text="Loading wallet..." />;
//   }

//   return (
//     <section>
//       <AppButton
//         isLoading={isLoading}
//         label={
//           bech32Address
//             ? `VIEW ACCOUNT ${maskAddress(bech32Address)}`
//             : "CONNECT XION WALLET"
//         }
//         onClick={handleConnect}
//       />
//       <Abstraxion 
//         onClose={() => setShow(false)} 
//       />
//     </section>
//   );
// };

// export default XionWallet;