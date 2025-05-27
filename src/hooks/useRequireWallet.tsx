import { useCallback, useEffect, useRef } from "react"
import { useWalletAuthMutation } from "@/api/authService";
import { useAppDispatch, useAppSelector } from "@/store";
import { useToast } from "@/hooks/useToast";
import { IApiResponse, IUserResponse } from "@/@types/types";
import { setAuthenticated } from "@/features/authSlice";
import AuthStore from "@/utils/AuthStore";
import useWallet from "@/components/Wallet/useWallet";

export const useRequireWallet = () => {
  const { setShow, bech32Address, isConnected, isConnecting, logout } = useWallet();
  const [walletAuth, { isLoading }] = useWalletAuthMutation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const toast = useToast();
  const authInProgress = useRef(false);

  const connect = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const disconnect = useCallback(() => {
    logout?.();
    AuthStore.removeAccessToken();
    dispatch(setAuthenticated({ isAuthenticated: false, user: null }));
    setShow(false);
    toast.success("Wallet disconnected successfully.");
  }, [logout, dispatch, toast, setShow]);

  const authenticate = useCallback(async () => {
    if (authInProgress.current || !bech32Address) return;

    authInProgress.current = true;
    toast.dismiss();
    const loadingToast = toast.loading("Authenticating wallet...");

    try {
      const response: IApiResponse = await walletAuth({ walletAddress: bech32Address }).unwrap();
      toast.dismiss(loadingToast);

      if (response.status === 200) {
        const user = response.data as IUserResponse;
        dispatch(setAuthenticated({
          isAuthenticated: true,
          user: {
            id: user.accessToken,
            roles: user.result!.role,
            walletAddress: user.result!.walletAddress,
            isVerified:user.result!.isVerified
          },
        }));
        AuthStore.setAccessToken(user.accessToken);
        toast.success("Wallet connected successfully!");
      } else {
        toast.error(response.message || "Authentication failed", {
          action: <button onClick={authenticate}>Retry</button>,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Wallet authentication failed. Please try again.", {
        action: <button onClick={authenticate}>Retry</button>,
      });
      console.error("Wallet Auth Error:", error);
    } finally {
      authInProgress.current = false;
    }
  }, [bech32Address, walletAuth, dispatch, toast]);

  useEffect(() => {
    if (isConnected && !isConnecting && bech32Address && !isAuthenticated) {
      authenticate();
    }

    if (!isConnected && isAuthenticated && !isConnecting) {
      disconnect();
    }
  }, [isConnected, isConnecting, bech32Address, isAuthenticated, authenticate, disconnect]);

  return {
    connect,
    disconnect,
    authenticate,
    isAuthenticated,
    bech32Address,
    isConnecting,
    isConnected,
    isLoading,
  };
};
