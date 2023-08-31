import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios, { API_URL } from "../config/general";
import PopupNotification from "./PopupNotification";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
}

const initialFormData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone_number: "",
};

const RegistrationForm = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();

  const [formData, setFormData] = useState(initialFormData);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleOpenNotification = (success: boolean, message: string) => {
    setIsSuccess(success);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password === formData.confirmPassword) {
      const payload: FormData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
      };

      if (formData.phone_number !== "") {
        payload.phone_number = formData.phone_number;
      }
      try {
        await axios.post(`${API_URL}/auth/register`, payload);
        navigate("/login");
      } catch (error) {
        resetFormData();
        handleOpenNotification(false, "An error occurred during registration.");
      }
    } else {
      setDoPasswordsMatch(false);
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
            placeholder="First Name"
            size="md"
            mb="4"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Last Name"
            size="md"
            mb="4"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
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
          <Input
            placeholder="Confirm Password"
            size="md"
            mb="4"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Phone Number (Optional)"
            size="md"
            mb="4"
            name="phone_number"
            type="tel"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
          <Button
            bgGradient="linear(to-tr, green.400, yellow.300)"
            color={colorMode === "light" ? "white" : "gray.700"}
            _hover={{ opacity: 0.8 }}
            type="submit"
          >
            Register
          </Button>
          {!doPasswordsMatch && (
            <Text mt="2" color="red">
              Passwords do not match
            </Text>
          )}
          <Flex mt="4" justify="center" align="center">
            <Link
              color={colorMode === "light" ? "green.500" : "green.300"}
              fontSize="sm"
              href="/login"
            >
              Already registered? Go to login.
            </Link>
          </Flex>
        </Flex>
      </form>
      <PopupNotification
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        isSuccess={isSuccess}
        message={notificationMessage}
      />
    </Box>
  );
};

export default RegistrationForm;
