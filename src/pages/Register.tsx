import {
    VStack,
    Flex,
    Text,
    Box,
    useBreakpointValue,
  } from "@chakra-ui/react";
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
  import RegistrationForm from "../components/RegistrationForm";
  
  const Register = () => {
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
            <Box mt={isSmallerScreen ? "16" : "0"} position="relative">
              <Text fontSize="3xl" fontWeight="semibold">
                Welcome!
              </Text>
              <Text
                fontSize="4xl"
                fontWeight="bold"
                bgGradient="linear(to-r, green.500, yellow.300, green.300)"
                bgClip="text"
              >
                Create an Account
              </Text>
              <Text>
                To manage your products and prices, please create an account.
              </Text>
            </Box>
            <RegistrationForm />
          </Flex>
        </VStack>
        <Footer />
      </Flex>
    );
  }
  
  export default Register