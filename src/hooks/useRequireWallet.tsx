import { useCallback, useEffect, useRef } from "react";
import { useWalletAuthMutation } from "@/api/authService";
import { useAppDispatch, useAppSelector } from "@/store";
import { useToast } from "@/hooks/useToast";
import {
  AuthResponse,
  IApiResponse,
  Roles,
} from "@/@types/types";
import { setAuthenticated } from "@/features/authSlice";
import AuthStore from "@/utils/AuthStore";
import useWallet from "@/components/Wallet/useWallet";

export const useRequireWallet = () => {
  const { setShow, bech32Address, isConnected, isConnecting, logout,openWalletModal } =
    useWallet();
  const [walletAuth, { isLoading }] = useWalletAuthMutation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const toast = useToast();
  const authInProgress = useRef(false);
  const lastAuthenticatedAddress = useRef<string | null>(null);


  const disconnect = useCallback(() => {
    logout?.();
    AuthStore.removeAccessToken();
    dispatch(setAuthenticated({ isAuthenticated: false, user: null }));
    setShow(false);
    lastAuthenticatedAddress.current = null;
    toast.success("Wallet disconnected successfully.");
  }, [logout, dispatch, setShow, toast]);

  const authenticate = useCallback(async () => {
    if (authInProgress.current || !bech32Address) return;

    if (isAuthenticated && lastAuthenticatedAddress.current === bech32Address) {
      console.log("are you authenticated, skipping");
      return;
    }

    authInProgress.current = true;
    toast.dismiss();
    const loadingToast = toast.loading("Authenticating wallet...");

    try {
      const response: IApiResponse = await walletAuth({
        walletAddress: bech32Address,
      }).unwrap();
      toast.dismiss(loadingToast);
      console.log({ response });

      if (response.status === 200) {
        console.log({ response }, "here");
        const successResponse = response.data as AuthResponse;
        console.log({ successResponse });
        console.log({ user: successResponse.user.role }, "again here");
        console.log({ user: successResponse.user.walletAddress }, "again here");
        console.log({ user: successResponse.user.role }, "again here");
        dispatch(
          setAuthenticated({
            isAuthenticated: true,
            user: {
              id: successResponse.user?._id,
              // roles: [Roles.ADMIN],
              roles: successResponse.user.role.map(
                (role) => role.toLowerCase() as Roles
              ),
              walletAddress: successResponse.user.walletAddress,
              isVerified: successResponse.user.isVerified,
            },
          })
        );
        AuthStore.setAccessToken(successResponse.accessToken);
        lastAuthenticatedAddress.current = bech32Address;
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
  }, [bech32Address, walletAuth, dispatch, toast, isAuthenticated]);

  useEffect(() => {
    console.log("Wallet state changed:", {
      isConnected,
      isConnecting,
      bech32Address,
      isAuthenticated,
      authInProgress: authInProgress.current,
      lastAuthenticatedAddress: lastAuthenticatedAddress.current,
    });

    if (isConnecting) {
      console.log("Wallet is connecting...");
      return;
    }

    if (
      isConnected &&
      bech32Address &&
      !isAuthenticated &&
      !authInProgress.current
    ) {
      console.log("Auto authenticating wallet...");
      authenticate();
      return;
    }

    if (
      isConnected &&
      bech32Address &&
      isAuthenticated &&
      lastAuthenticatedAddress.current !== bech32Address &&
      !authInProgress.current
    ) {
      console.log("Wallet address changed, re-authenticating...");
      authenticate();
      return;
    }

    if (!isConnected && isAuthenticated && !isConnecting) {
      console.log("Wallet disconnected, clearing auth state...");
      disconnect();
    }
  }, [isConnected, isConnecting, bech32Address, isAuthenticated]);

  return {
    openWalletModal,
    disconnect,
    authenticate,
    isAuthenticated,
    bech32Address,
    isConnecting,
    isConnected,
    isLoading,
  };
};
