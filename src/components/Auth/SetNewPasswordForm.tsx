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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios  from "../../config/general";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const toast = useToast();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

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
      toast({
        title: t("error"),
        description: t("wrongConfPassword"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    else {
      try {
        await axios.post(`/auth/password-token-confirm`, {
          email: userEmail,
          token: userCode,
          password: formData.password,
        });
        navigate("/login");
      } catch (e) {
        setIsChangingPasswordFailed(true);
        toast({
          title: t("error"),
          description: t("resetFailed"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
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
            placeholder={t("newPassword")}
            size="md"
            mb="4"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder={t("confirmNewPassword")}
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
            {t("continue")}
          </Button>
          {isChangingPasswordFailed && (
            <Flex mt="4" justify="center" align="center">
              <Link
                color={colorMode === "light" ? "green.500" : "green.300"}
                fontSize="sm"
                href="/forgot-password"
              >
                {t("tryAgain")}
              </Link>
            </Flex>
          )}
        </Flex>
      </form>
    </Box>
  );
};

export default SetNewPasswordForm;
