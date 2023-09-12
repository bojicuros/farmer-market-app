import { VStack, Flex, Text, Box, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import LoginForm from "../components/Auth/LoginForm";

const Login = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const flexDirection = isSmallerScreen ? "column" : "row";

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
          <Box mt={isSmallerScreen ? "16" : "0"}>
            <Text fontSize="3xl" fontWeight="semibold">
              Welcome!
            </Text>
            <Text
              fontSize="4xl"
              fontWeight="bold"
              bgGradient="linear(to-r, green.500, yellow.300, green.300)"
              bgClip="text"
            >
              Sign in to Your Account
            </Text>
            <Text>
              To manage your products and prices, please sign in to your
              account.
            </Text>
          </Box>
          <LoginForm />
        </Flex>
      </VStack>
      <Footer />
    </Flex>
  );
};

export default Login;
