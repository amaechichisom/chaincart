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
import { useToast } from "@/hooks/useToast";
import { useAppDispatch } from "@/store";
import AuthStore from "@/utils/AuthStore";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [register, { isLoading: registerLoad }] = useAuthRegisterMutation();
  const [login, { isLoading: loginLoad }] = useAuthLoginMutation();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerAuth = useCallback(
    async (email: string, password: string) => {
      toast.dismiss();
      const loadingToast = toast.loading("Registering...");

      try {
        const response: IApiResponse = await register({ email, password }).unwrap();
        toast.dismiss(loadingToast);

        if (response.status === 201) {
          const successResponse = response.data as AuthResponse;
          dispatch(
            setAuthenticated({
              isAuthenticated: true,
              user: {
                id: successResponse.user._id,
                roles: successResponse.user.role.map(
                  (role) => role.toLowerCase() as Roles
                ),
                walletAddress: successResponse.user.walletAddress ?? "",
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
      toast.dismiss();
      const loadingToast = toast.loading("Logging in...");

      try {
        const response: IApiResponse = await login({ email, password }).unwrap();
        toast.dismiss(loadingToast);

        if (response.status === 200) {
          const successResponse = response.data as AuthResponse;

          dispatch(
            setAuthenticated({
              isAuthenticated: true,
              user: {
                id: successResponse.user._id,
                roles: successResponse.user.role.map(
                  (role) => role.toLowerCase() as Roles
                ),
                walletAddress: successResponse.user.walletAddress ?? "",
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
