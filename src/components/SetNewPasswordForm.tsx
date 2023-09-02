import {
  Box,
  Flex,
  Input,
  Button,
  useBreakpointValue,
  useColorMode,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { API_URL } from "../config/general";

type SetNewPasswordFormProps = {
  userEmail: string;
  userCode: string;
};

const SetNewPasswordForm = ({
  userEmail,
  userCode,
}: SetNewPasswordFormProps) => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
  const [isChangingPasswordFailed, setIsChangingPasswordFailed] =
    useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword)
      setPasswordsDoNotMatch(true);
    else {
      setPasswordsDoNotMatch(false);
      try {
        await axios.post(`${API_URL}/auth/password-token-confirm`, {
          email: userEmail,
          token: userCode,
          password: formData.password,
        });
        navigate("/login");
      } catch (e) {
        setIsChangingPasswordFailed(true);
      }
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
            placeholder="New password"
            size="md"
            mb="4"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Confirm new password"
            size="md"
            mb="4"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <Button
            bgGradient="linear(to-tr, green.400, yellow.300)"
            color={colorMode === "light" ? "white" : "gray.700"}
            _hover={{ opacity: 0.8 }}
            type="submit"
          >
            Continue
          </Button>
          {passwordsDoNotMatch && (
            <Text mt="2" color="red">
              Passwords do not match.
            </Text>
          )}
          {isChangingPasswordFailed && (
            <Flex mt="4" justify="center" align="center">
              <Text mt="2" color="red">
                Password reset failed.
              </Text>
              <Link
                color={colorMode === "light" ? "green.500" : "green.300"}
                fontSize="sm"
                href="/forgot-password"
              >
                Try again here.
              </Link>
            </Flex>
          )}
        </Flex>
      </form>
    </Box>
  );
};

export default SetNewPasswordForm;
