import {
    Box,
    Flex,
    Text,
    useBreakpointValue,
    useColorMode,
  } from "@chakra-ui/react";
  
  const Header = () => {
    const { colorMode } = useColorMode();
    const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  
    return (
      <Flex
        direction={!isSmallerScreen ? "row" : "column"}
        p={isSmallerScreen ? "0" : "28"}
        alignSelf="flex-start"
        mb={isSmallerScreen ? "0" : "-16"}
      >
        <Box mt={isSmallerScreen ? "16" : "0"} alignSelf="flex-start">
          <Text fontSize={isSmallerScreen ? "3xl" : "5xl"} fontWeight="semibold">
            Welcome to
          </Text>
          <Text
            fontSize={isSmallerScreen ? "5xl" : "7xl"}
            fontWeight="bold"
            bgGradient="linear(to-r, green.500, yellow.300, green.300)"
            bgClip="text"
          >
            Market Price Check
          </Text>
          <Text color={colorMode === "light" ? "gray.600" : "gray.200"}>
            Looking for the best prices on fresh produce in your area? Try Market
            Price Check! Compare prices from various farmer markets and find great
            deals on fruits, vegetables, and more.
          </Text>
        </Box>
      </Flex>
    );
  };
  
  export default Header