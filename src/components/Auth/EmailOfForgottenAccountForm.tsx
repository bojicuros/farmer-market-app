import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  useBreakpointValue,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import axios  from "../../config/general";
import { useTranslation } from "react-i18next";

type EmailOfForgottenAccountFormProps = {
  setIsEmailConfirmed: (arg0: boolean) => void;
  setUserEmail: (arg0: string) => void;
};

const EmailOfForgottenAccountForm = ({
  setIsEmailConfirmed,
  setUserEmail,
}: EmailOfForgottenAccountFormProps) => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const toast = useToast();

  const [formData, setFormData] = useState({
    email: "",
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
      const res = await axios.post(
        `/auth/email-available?email=${formData.email}`
      );
      if (!res.data.available) {
        await axios.post(
          `/auth/forgot-password?email=${formData.email}`
        );
        setIsEmailConfirmed(true);
        setUserEmail(formData.email);
      }
      toast({
        title: t("error"),
        description: t("wrongEmail"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: t("error"),
        description: t("errorEmailCheck"),
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
      p={isSmallerScreen ? "10" : "0"}
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
          <Button
            bgGradient="linear(to-tr, green.400, yellow.300)"
            color={colorMode === "light" ? "white" : "gray.700"}
            _hover={{ opacity: 0.8 }}
            type="submit"
          >
            {t("confirm")}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default EmailOfForgottenAccountForm;
