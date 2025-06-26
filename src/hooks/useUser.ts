import { useRouter } from "next/navigation";
import { ILogin, IUserLoginResponse } from "../lib/types";
import axios from "../config/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { responseStatus } from "../utils/helpers";
import { dashboardRoute } from "../utils/route";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleLogin = async (data: ILogin) => {
    const response = await axios.post("/auth/user/login", data);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    IUserLoginResponse,
    AxiosError<IUserLoginResponse>,
    ILogin
  >({
    mutationFn: handleLogin,
    onSuccess: (data: IUserLoginResponse) => {
      responseStatus(data.status.code, data.status.message, router);
      const accessToken = data.data.authentication.authorizationToken;
      const refreshToken = data.data.authentication.refreshToken;
      const user = data.data.authentication.profile;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("user", JSON.stringify(user));
      // console.log(data.data);
      if (data.status.code === 200) {
        router.push(dashboardRoute);
        toast.success("Login Successful");
      }
    },
  });

  // Return the mutation object to use in components
  return mutation;
};
