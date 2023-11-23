import {
  Box,
  Flex,
  Input,
  Button,
  useBreakpointValue,
  useColorMode,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "../../config/general";
import { AuthUser, UserInfo } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { axiosPrivate } from "../../config/general";

const LoginForm = () => {
  const { colorMode } = useColorMode();
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const toast = useToast();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setAuth } = useAuth();

  const accessToken = sessionStorage.getItem("accessToken");

  function isTokenExpired(token: AuthUser) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (token.exp < currentTime) return true;
    return false;
  }

  useEffect(() => {
    if (accessToken !== null) {
      const token = jwt_decode(accessToken) as AuthUser;
      if (isTokenExpired(token)) {
        navigate("/login");
        sessionStorage.removeItem("accessToken");
      } else {
        setAuth({ accessToken: accessToken, user: token });
        navigate("/dashboard");
      }
    }
  }, [accessToken, navigate, setAuth]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/auth/login`, formData);
      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const token = jwt_decode(accessToken) as AuthUser;
        if (isTokenExpired(token)) {
          navigate("/unauthorized");
        } else {
          setAuth({ accessToken: accessToken, user: token });
          sessionStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          const userInfo = await fetchUserInfo(token);
          if (userInfo && userInfo.is_active && userInfo.is_approved)
            navigate("/dashboard");
          else navigate("/unauthorized");
        }
      } else
        toast({
          title: t("error"),
          description: t("errorWhileLogin"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (error) {
      toast({
        title: t("error"),
        description: t("wrongCredentials"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  };

  const fetchUserInfo = async (user: AuthUser | undefined) => {
    try {
      const response = await axiosPrivate.get(
        `/users/get-by-id?id=${user?.userId}`
      );
      if (response.status === 200) {
        const fetchedInfo = response.data as UserInfo;
        return fetchedInfo;
      } else {
        toast({
          title: t("error"),
          description: t("errorFetchingUserInfo"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorFetchingUserInfo"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      mt={isSmallerScreen ? "16" : "0"}
      alignItems="flex-start"
      p={isSmallerScreen ? "6" : "0"}
    >
      <form onSubmit={handleSubmit}>
        <Flex direction="column" p={5}>
          <Input
            placeholder="Email"
            size="md"
            mb="4"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder={t("password")}
            size="md"
            mb="4"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Button
            bgGradient="linear(to-tr, green.400, yellow.300)"
            color={colorMode === "light" ? "white" : "gray.700"}
            _hover={{ opacity: 0.8 }}
            type="submit"
          >
            {t("login")}
          </Button>
          <Flex direction="column" mt="4" align="center">
            <Link
              color={colorMode === "light" ? "green.500" : "green.300"}
              fontSize="sm"
              href="/forgot-password"
            >
              {t("forgotPassword")}
            </Link>
            <Link
              color={colorMode === "light" ? "green.500" : "green.300"}
              fontSize="sm"
              href="/register"
            >
              {t("notRegistered")}
            </Link>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default LoginForm;
