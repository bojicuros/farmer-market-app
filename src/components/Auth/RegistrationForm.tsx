import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  useBreakpointValue,
  useColorMode,
  Link,
  useToast,
  CheckboxGroup,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import axios, { API_URL } from "../../config/general";
import { useTranslation } from "react-i18next";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
  is_admin: boolean;
  is_vendor: boolean;
}

const initialFormData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone_number: "",
  is_admin: false,
  is_vendor: false,
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
  const toast = useToast();

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: keyof FormData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: !prevFormData[name],
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
        is_admin: formData.is_admin,
        is_vendor: formData.is_vendor,
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
          toast({
            title: t("takenEmail"),
            status: "warning",
            duration: 1500,
            position: "top",
            isClosable: true,
          });
        }
      } catch (error) {
        resetFormData();
        toast({
          title: t("error"),
          description: t("errorRegistration"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
      }
    } else {
      toast({
        title: t("error"),
        description: t("wrongConfPassword"),
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
        <Flex direction="column" p={5} gap={4}>
          <Input
            placeholder={t("firstName")}
            size="md"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder={t("lastName")}
            size="md"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Email"
            size="md"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder={t("password")}
            size="md"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder={t("confirmPassword")}
            size="md"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder={t("phoneNumber")}
            size="md"
            name="phone_number"
            type="tel"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
          <CheckboxGroup colorScheme="green" defaultValue={[]}>
            <HStack align="center" justifyContent={"space-around"}>
              <Checkbox
                isChecked={formData.is_admin}
                onChange={() => handleCheckboxChange("is_admin")}
                required={!formData.is_vendor}
              >
                {t("admin")}
              </Checkbox>
              <Checkbox
                isChecked={formData.is_vendor}
                onChange={() => handleCheckboxChange("is_vendor")}
              >
                {t("vendor")}
              </Checkbox>
            </HStack>
          </CheckboxGroup>

          <Button
            bgGradient="linear(to-tr, green.400, yellow.300)"
            mb={-3}
            color={colorMode === "light" ? "white" : "gray.700"}
            _hover={{ opacity: 0.8 }}
            type="submit"
          >
            {t("register")}
          </Button>
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
    </Box>
  );
};

export default RegistrationForm;
