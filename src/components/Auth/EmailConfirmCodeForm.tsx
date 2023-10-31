import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  useBreakpointValue,
  useColorMode,
  Link,
  Text
} from "@chakra-ui/react";
import axios, { API_URL } from "../../config/general";
import { useTranslation } from "react-i18next";
import PopupNotification from "../Common/PopupNotification";

type EmailConfirmCodeFormProps = {
  setIsCodeConfirmed: (arg0: boolean) => void;
  createdUserId: string | null;
};

const EmailConfirmCodeForm = ({
  setIsCodeConfirmed,
  createdUserId,
}: EmailConfirmCodeFormProps) => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
  const { t } = useTranslation();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleOpenNotification = (success: boolean, message: string) => {
    setIsSuccess(success);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const [formData, setFormData] = useState({
    code: "",
  });

  const [attemptsLeft, setAttemptsLeft] = useState(3);

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
      await axios.post(`${API_URL}/auth/email-token-confirm`, {
        user_id: createdUserId,
        token: formData.code,
      });
      setIsCodeConfirmed(true);
    } catch (error) {
      handleOpenNotification(
        false,

        attemptsLeft > 0
          ? `${attemptsLeft} ${t("errorInCode")}.`
          : "Profile is deleted."
      );
      setAttemptsLeft(attemptsLeft - 1);
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
          <Text size="md" mb={2}>
            {t("enterCode")}
          </Text>
          <Input
            placeholder={t("code")}
            size="md"
            mb="4"
            name="code"
            type="number"
            value={formData.code}
            onChange={handleInputChange}
            required
          />
          <Button
            bgGradient="linear(to-tr, green.400, yellow.300)"
            color={colorMode === "light" ? "white" : "gray.700"}
            _hover={{ opacity: 0.8 }}
            type="submit"
            disabled={attemptsLeft === 0}
          >
            {t("confirm")}
          </Button>
          {attemptsLeft === 0 && (
            <Flex mt="4" justify="center" align="center">
              <Link
                color={colorMode === "light" ? "green.500" : "green.300"}
                fontSize="sm"
                href="/register"
              >
                {t("again")}.
              </Link>
            </Flex>
          )}
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

export default EmailConfirmCodeForm;
