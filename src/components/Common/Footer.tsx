import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <Box
      bgGradient={
        colorMode === "light"
          ? "linear(to-tr, green.400, yellow.200)"
          : "linear(to-tr, green.300, yellow.200)"
      }
      color={colorMode === "light" ? "white" : "gray.700"}
      p="8"
      mt="8"
    >
      <Flex direction="column" alignItems="center" textAlign="center">
        <Text fontSize="lg" fontWeight="bold">
          {t("contact")}
        </Text>
        <Text fontSize="sm" mt="4">
          {t("contactInfo")}
          <a href="mailto:pijacnibarometar@gmail.com">
            pijacnibarometar@gmail.com
          </a>
        </Text>
        <Text fontSize="sm" mt="4">
          {t("appName")} &copy; {new Date().getFullYear()} {t("rights")}.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
