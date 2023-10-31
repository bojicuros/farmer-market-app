import { VStack, Flex, Text, Box, useBreakpointValue } from "@chakra-ui/react";
import Footer from "../components/Common/Footer";
import LoginForm from "../components/Auth/LoginForm";
import { useTranslation } from "react-i18next";
import NavbarAdmin from "../components/Common/NavbarAdmin";

const Login = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const flexDirection = isSmallerScreen ? "column" : "row";
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
              {t("welcomeAlt")}
            </Text>
            <Text
              fontSize="4xl"
              fontWeight="bold"
              bgGradient="linear(to-r, green.500, yellow.300, green.300)"
              bgClip="text"
            >
              {t("signIn")}
            </Text>
            <Text>{t("loginAdditionText")}</Text>
          </Box>
          <LoginForm />
        </Flex>
      </VStack>
      <Footer />
    </Flex>
  );
};

export default Login;
