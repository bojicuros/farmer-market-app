import {
  VStack,
  Flex,
  Text,
  Box,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import RegistrationForm from "../components/Auth/RegistrationForm";
import { useState } from "react";
import EmailConfirmCodeForm from "../components/Auth/EmailConfirmCodeForm";
import { useTranslation } from "react-i18next";

const Register = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const flexDirection = isSmallerScreen ? "column" : "row";
  const { t } = useTranslation();

  const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false);
  const [createdUserId, setCreatedUserId] = useState(null);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <VStack flex="1" p={5}>
        <Navbar />
        <Flex
          direction={flexDirection}
          p={isSmallerScreen ? "0" : "28"}
          alignSelf="center"
          justifyContent={"space-between"}
          minW={"100%"}
        >
          <Box mt={isSmallerScreen ? "16" : "0"} position="relative">
            <Text fontSize="3xl" fontWeight="semibold">
              {t("welcomeAlt")}
            </Text>
            <Text
              fontSize="4xl"
              fontWeight="bold"
              bgGradient="linear(to-r, green.500, yellow.300, green.300)"
              bgClip="text"
            >
              {t("createAccount")}
            </Text>
            <Text>{t("registerAdditionalText")}</Text>
          </Box>
          {!isRegistrationCompleted && (
            <RegistrationForm
              setIsRegistrationCompleted={setIsRegistrationCompleted}
              setCreatedUserId={setCreatedUserId}
            />
          )}
          {isRegistrationCompleted && !isCodeConfirmed && (
            <EmailConfirmCodeForm
              setIsCodeConfirmed={setIsCodeConfirmed}
              createdUserId={createdUserId}
            />
          )}
          {isRegistrationCompleted && isCodeConfirmed && (
            <Flex mt={20} justify="center" align="center">
              <Link color="green.400" fontSize="sm" href="/login">
                {t("successfulRegister")}
              </Link>
            </Flex>
          )}
        </Flex>
      </VStack>
      <Footer />
    </Flex>
  );
};

export default Register;
