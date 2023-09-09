import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";

const Footer = () => {
  const { colorMode } = useColorMode();

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
          Contact Us
        </Text>
        <Text fontSize="sm" mt="4">
          For inquiries and support, please email us at{" "}
          <a href="mailto:pijacnibarometar@gmail.com">
            pijacnibarometar@gmail.com
          </a>
        </Text>
        <Text fontSize="sm" mt="4">
          Market Price Check &copy; {new Date().getFullYear()} All rights
          reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
