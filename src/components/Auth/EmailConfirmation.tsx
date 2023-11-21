import { useEffect, useState } from "react";
import EmailConfirmCodeForm from "./EmailConfirmCodeForm";
import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import axios  from "../../config/general";
import { AuthUser, UserInfo } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type EmailConfirmationProps = {
  user: AuthUser;
  userInfo: UserInfo | null;
};

const EmailConfirmation = ({ user, userInfo }: EmailConfirmationProps) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isCodeConfirmed) {
      navigate("/login");
    }
  }, [isCodeConfirmed, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(
        `/auth/require-token?email=${userInfo?.email}`
      );
      setIsCodeSent(true);
    } catch (error) {
      setIsCodeSent(false);
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="60vh"
      flexDirection="column"
    >
      {!isCodeSent ? (
        <Box>
          <form onSubmit={handleSubmit}>
            <Flex direction="column" p={5} alignItems="center">
              <Text size="md" mb={2}>
                {t("missingCode")}
              </Text>
              <Button
                bgGradient="linear(to-tr, green.400, yellow.300)"
                color={colorMode === "light" ? "white" : "gray.700"}
                _hover={{ opacity: 0.8 }}
                type="submit"
              >
                {t("send")}
              </Button>
            </Flex>
          </form>
        </Box>
      ) : (
        <Box>
          <EmailConfirmCodeForm
            setIsCodeConfirmed={setIsCodeConfirmed}
            createdUserId={user.userId}
          />
        </Box>
      )}
    </Flex>
  );
};

export default EmailConfirmation;
