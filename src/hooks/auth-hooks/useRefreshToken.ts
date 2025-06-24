import axios from "../../config/axios";
import { userAuth } from "../../stores/variables";

export default function useRefreshToken() {
  const { credentials: auth, setCredentials, logout } = userAuth();

  const refresh = async () => {
    try {
      if (!auth?.refreshToken) {
        console.error("No refresh token available");
        logout();
        return null;
      }

      const { data } = await axios.post(
        "/auth/user/refresh",
        {
          refreshToken: auth.refreshToken,
        },
        {
          headers: {
            Authorization: auth.refreshToken,
          },
        }
      );

      const newAccessToken = data?.data?.authorizationToken;

      if (newAccessToken && auth.user) {
        // Update credentials with new access token
        setCredentials(newAccessToken, auth.refreshToken, auth.user);
        console.log("Token refreshed successfully");
        return newAccessToken;
      } else {
        console.error("Invalid refresh response");
        logout();
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout(); // Clear invalid tokens
      return null;
    }
  };

  return refresh;
}
