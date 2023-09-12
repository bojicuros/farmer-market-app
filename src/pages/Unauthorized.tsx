import { VStack, Flex, useBreakpointValue, Box, Text } from "@chakra-ui/react";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";

const Unauthorized = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const fontSizeHeading = isSmallerScreen ? "2xl" : "4xl";
  const fontSizeSubheading = isSmallerScreen ? "xl" : "3xl";

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <VStack flex="1" p={5}>
        <Navbar />
        <Box textAlign="center" mt="20vh">
          <Text fontSize={fontSizeSubheading} fontWeight="semibold">
            Unauthorized Access
          </Text>
          <Text
            fontSize={fontSizeHeading}
            fontWeight="bold"
            bgGradient="linear(to-r, green.500, yellow.300, green.300)"
            bgClip="text"
            textAlign="center"
          >
            You do not have permission to access this page.
          </Text>
          <Text mt={4}>
            If you believe this is an error, please contact the administrator.
          </Text>
        </Box>
      </VStack>
      <Footer />
    </Flex>
  );
};

export default Unauthorized;
