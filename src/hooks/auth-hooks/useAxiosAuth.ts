import { axiosAuth } from "@/config/axios";
import { useEffect } from "react";
import { userAuth } from "../../stores/variables";
import useRefreshToken from "./useRefreshToken";

export default function useAxiosAuth() {
  const { credentials: auth } = userAuth();
  const refresh = useRefreshToken();

//   console.log('auth token cred', auth)
  
  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = auth?.accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessoken = await refresh();
          prevRequest.headers["Authorization"] = newAccessoken;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.response.eject(responseIntercept);
      axiosAuth.interceptors.request.eject(requestIntercept);
    };
  }, [auth, refresh]);

  return axiosAuth;
}
