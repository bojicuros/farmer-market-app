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
import axios, { API_URL } from "../../config/general";
import PopupNotification from "../Common/PopupNotification";
import { useTranslation } from "react-i18next";

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

type RegistrationFormProps = {
  setIsRegistrationCompleted: (arg0: boolean) => void;
  setCreatedUserId: (arg0: null) => void;
};

const RegistrationForm = ({
  setIsRegistrationCompleted,
  setCreatedUserId,
}: RegistrationFormProps) => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
  const { t } = useTranslation();

  const [formData, setFormData] = useState(initialFormData);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);

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
        const res = await axios.post(
          `${API_URL}/auth/email-available?email=${payload.email}`
        );
        if (res.data.available) {
          const response = await axios.post(
            `${API_URL}/auth/register`,
            payload
          );
          setCreatedUserId(response.data.id);
          setIsRegistrationCompleted(true);
        } else {
          setEmailAvailable(false);
        }
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
            placeholder={t("firstName")}
            size="md"
            mb="4"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder={t("lastName")}
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
            placeholder={t("password")}
            size="md"
            mb="4"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder={t("confirmPassword")}
            size="md"
            mb="4"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder={t("phoneNumber")}
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
            {t("register")}
          </Button>
          {!doPasswordsMatch && (
            <Text mt="2" color="red">
              {t("wrongConfPassword")}
            </Text>
          )}
          {!emailAvailable && (
            <Text mt="2" color="red">
              {t("takenEmail")}
            </Text>
          )}
          <Flex mt="4" justify="center" align="center">
            <Link
              color={colorMode === "light" ? "green.500" : "green.300"}
              fontSize="sm"
              href="/login"
            >
              {t("userHasProfile")}
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
