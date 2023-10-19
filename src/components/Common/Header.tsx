import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { colorMode } = useColorMode();
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { t } = useTranslation();

  return (
    <Flex
      direction={!isSmallerScreen ? "row" : "column"}
      p={isSmallerScreen ? "0" : "28"}
      alignSelf="flex-start"
      mb={isSmallerScreen ? "0" : "-16"}
    >
      <Box mt={isSmallerScreen ? "16" : "0"} alignSelf="flex-start">
        <Text fontSize={isSmallerScreen ? "3xl" : "5xl"} fontWeight="semibold">
          {t("welcome")}
        </Text>
        <Text
          fontSize={isSmallerScreen ? "5xl" : "7xl"}
          fontWeight="bold"
          bgGradient="linear(to-r, green.500, yellow.300, green.300)"
          bgClip="text"
        >
          {t("appName")}
        </Text>
        <Text color={colorMode === "light" ? "gray.600" : "gray.200"}>
          {t("buttonText")}
        </Text>
      </Box>
    </Flex>
  );
};

export default Header;
