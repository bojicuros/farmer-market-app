import {
  Box,
  Flex,
  Input,
  Button,
  useBreakpointValue,
  useColorMode,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios, { API_URL } from "../../config/general";
import { AuthUser } from "../../context/AuthContext";

const LoginForm = () => {
  const { colorMode } = useColorMode();
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });

  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [areCredentialsIncorrect, setAreCredentialsIncorrect] = useState(false);

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
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      const token = response.data.accessToken;
      const decodedToken = jwt_decode(token) as AuthUser;
      setAuth({ accessToken: token, user: decodedToken });
      if (!decodedToken.is_active) navigate("/unauthorized");
      else navigate("/dashboard");
    } catch (error) {
      setAreCredentialsIncorrect(true);
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
            placeholder="Password"
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
            Login
          </Button>
          {areCredentialsIncorrect && (
            <Text mt="2" color="red">
              Incorrect credentials. Try again
            </Text>
          )}
          <Flex direction="column" mt="4" align="center">
            <Link
              color={colorMode === "light" ? "green.500" : "green.300"}
              fontSize="sm"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
            <Link
              color={colorMode === "light" ? "green.500" : "green.300"}
              fontSize="sm"
              href="/register"
            >
              Not registered? Register here.
            </Link>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default LoginForm;
