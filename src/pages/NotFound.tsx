import { VStack, Flex, useBreakpointValue, Box, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const fontSizeHeading = isSmallerScreen ? "2xl" : "4xl";
  const fontSizeSubheading = isSmallerScreen ? "xl" : "3xl";

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <VStack flex="1" p={5}>
        <Navbar />
        <Box textAlign="center" mt="20vh">
          <Text fontSize={fontSizeSubheading} fontWeight="semibold">
            Oops! Page Not Found
          </Text>
          <Text
            fontSize={fontSizeHeading}
            fontWeight="bold"
            bgGradient="linear(to-r, green.500, yellow.300, green.300)"
            bgClip="text"
            textAlign="center"
          >
            The page you are looking for does not exist.
          </Text>
          <Text mt={4}>
            Please double-check the link or navigate back to the homepage.
          </Text>
        </Box>
      </VStack>
      <Footer />
    </Flex>
  );
};

export default NotFound;
