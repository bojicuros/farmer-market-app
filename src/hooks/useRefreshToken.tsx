import axios from "../config/general";
import { AuthUser } from "../context/AuthContext";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth ,setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth({
      user: auth?.user as AuthUser,
      accessToken: response.data.accessToken,
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
