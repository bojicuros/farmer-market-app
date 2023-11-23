import { VStack, Flex, Text, Box, useBreakpointValue } from "@chakra-ui/react";
import NavbarAdmin from "../components/Common/NavbarAdmin";
import Footer from "../components/Common/Footer";
import ResetCodeForm from "../components/Auth/ResetCodeForm";
import SetNewPasswordForm from "../components/Auth/SetNewPasswordForm";
import { useState } from "react";
import EmailOfForgottenAccountForm from "../components/Auth/EmailOfForgottenAccountForm";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const flexDirection = isSmallerScreen ? "column" : "row";
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userCode, setUserCode] = useState("");
  const { t } = useTranslation();

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <VStack flex="1" p={5}>
        <NavbarAdmin />
        <Flex
          direction={flexDirection}
          p={isSmallerScreen ? "0" : "28"}
          alignSelf="center"
          justifyContent={"space-between"}
          minW={"100%"}
        >
          <Box mt={isSmallerScreen ? "16" : "0"}>
            <Text fontSize="3xl" fontWeight="semibold">
              {t("forgotPassword")}
            </Text>
            <Text
              fontSize="4xl"
              fontWeight="bold"
              bgGradient="linear(to-r, green.500, yellow.300, green.300)"
              bgClip="text"
            >
              {t("enterCode")}
            </Text>
            <Text>{t("enterCodePlease")}</Text>
          </Box>
          {!isEmailConfirmed && (
            <EmailOfForgottenAccountForm
              setIsEmailConfirmed={setIsEmailConfirmed}
              setUserEmail={setUserEmail}
            />
          )}
          {isEmailConfirmed && !isCodeConfirmed && (
            <ResetCodeForm
              userEmail={userEmail}
              setIsCodeConfirmed={setIsCodeConfirmed}
              setUserCode={setUserCode}
            />
          )}
          {isEmailConfirmed && isCodeConfirmed && (
            <SetNewPasswordForm userCode={userCode} userEmail={userEmail} />
          )}
        </Flex>
      </VStack>
      <Footer />
    </Flex>
  );
};

export default ForgotPassword;
