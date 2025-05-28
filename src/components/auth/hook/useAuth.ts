import {
  AuthResponse,
  IApiResponse,
  IMessage,
  Roles,
} from "@/@types/types";
import {
  useAuthLoginMutation,
  useAuthRegisterMutation,
} from "@/api/authService";
import { setAuthenticated } from "@/features/authSlice";
import { useRequireWallet } from "@/hooks/useRequireWallet";
import { useToast } from "@/hooks/useToast";
import { persistor, RootState, useAppDispatch, useAppSelector } from "@/store";
import AuthStore from "@/utils/AuthStore";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [register, { isLoading: registerLoad }] = useAuthRegisterMutation();
  const [login, { isLoading: loginLoad }] = useAuthLoginMutation();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const {isConnected,connect,} = useRequireWallet()

  const registerAuth = useCallback(
    async (email: string, password: string) => {
     if (!isConnected) {
  connect(); 
  toast.info("Please connect your wallet to continue.");
  return;
}

      toast.dismiss();
      const loadingToast = toast.loading("Registering...");

      try {
        const response: IApiResponse = await register({
          email,
          password,
        }).unwrap();
        toast.dismiss(loadingToast);

        if (response.status === 201) {
          const successResponse = response.data as AuthResponse;
          const walletAddress = !successResponse.user.walletAddress?.trim()
            ? user?.walletAddress
            : successResponse.user.walletAddress;

          dispatch(
            setAuthenticated({
              isAuthenticated: true,
              user: {
                id: successResponse.user._id,
                roles: successResponse.user.role.map(
                  (role) => role.toLowerCase() as Roles
                ),
                walletAddress: walletAddress!,
                // walletAddress: successResponse.user.walletAddress ?? user?.walletAddress ?? '',
                isVerified: successResponse.user.isVerified,
              },
            })
          );

          AuthStore.setAccessToken(successResponse.accessToken);
          navigate("/seller", { replace: true });
          toast.success("Registration successful!");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } catch (error: unknown) {
        const err = error as { data?: IMessage };
        const errMsg =
          err?.data?.message || "An error occurred during registration.";

        toast.dismiss(loadingToast);
        toast.error(errMsg);
      }
    },
    [register, dispatch, navigate, toast]
  );

  const loginAuth = useCallback(
    async (email: string, password: string) => {
     if (!isConnected) {
  connect(); 
  toast.info("Please connect your wallet to continue.");
  return;
}

      toast.dismiss();
      const loadingToast = toast.loading("Logging in...");

      try {
        const response: IApiResponse = await login({
          email,
          password,
        }).unwrap();
        toast.dismiss(loadingToast);

        if (response.status === 200) {
          const successResponse = response.data as AuthResponse;
          const walletAddress = !successResponse.user.walletAddress?.trim()
            ? user?.walletAddress
            : successResponse.user.walletAddress;
          dispatch(
            setAuthenticated({
              isAuthenticated: true,
              user: {
                id: successResponse.user._id,
                roles: successResponse.user.role.map(
                  (role) => role.toLowerCase() as Roles
                ),
                walletAddress: walletAddress!,
                // walletAddress: successResponse.user.walletAddress ?? user?.walletAddress ?? '',
                isVerified: successResponse.user.isVerified,
              },
            })
          );

          AuthStore.setAccessToken(successResponse.accessToken);
          navigate("/seller", { replace: true });
          toast.success("Login successful!");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error: unknown) {
        const err = error as { data?: IMessage };
        const errMsg = err?.data?.message || "An error occurred during login.";
        toast.dismiss(loadingToast);
        toast.error(errMsg);
      }
    },
    [login, dispatch, navigate, toast]
  );

  const handleLogout = useCallback(() => {
    if (window.confirm("Are you sure you want to log out?")) {
      AuthStore.removeAccessToken();
       localStorage.removeItem('persist:root');
  persistor.pause();
  window.location.reload();
      dispatch(setAuthenticated({ isAuthenticated: false, user: null }));
      toast.success("Log out successful.");
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate, toast]);

  return {
    registerAuth,
    loginAuth,
    handleLogout,
    registerLoad,
    loginLoad,
  };
}
