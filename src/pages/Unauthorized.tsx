import { VStack, Flex, useBreakpointValue, Box, Text } from "@chakra-ui/react";
import NavbarAdmin from "../components/Common/NavbarAdmin";
import Footer from "../components/Common/Footer";
import { useTranslation } from "react-i18next";

const Unauthorized = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const fontSizeHeading = isSmallerScreen ? "2xl" : "4xl";
  const fontSizeSubheading = isSmallerScreen ? "xl" : "3xl";
  const { t } = useTranslation();

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <VStack flex="1" p={5}>
        <NavbarAdmin />
        <Box textAlign="center" mt="20vh">
          <Text fontSize={fontSizeSubheading} fontWeight="semibold">
            {t("unauthorizedAccess")}
          </Text>
          <Text
            fontSize={fontSizeHeading}
            fontWeight="bold"
            bgGradient="linear(to-r, green.500, yellow.300, green.300)"
            bgClip="text"
            textAlign="center"
          >
            {t("withoutPermission")}
          </Text>
          <Text mt={4}>{t("possibleError")}</Text>
        </Box>
      </VStack>
      <Footer />
    </Flex>
  );
};

export default Unauthorized;
