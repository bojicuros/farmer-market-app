import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";

const PriceAddingPercentageCard = () => {
  const { colorMode } = useColorMode();
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      mx={{ sm: "auto", md: "0px" }}
      w={250}
      h={250}
      align={"center"}
      justify={"center"}
      pl={isSmallerScreen ? undefined : 20}
    >
      <CircularProgress
        size={220}
        value={70}
        thickness={6}
        color={colorMode === "light" ? "green.400" : "green.500"}
      >
        <CircularProgressLabel>
          <Flex direction="column" justify="center" align="center">
            <Text fontSize={"4xl"} fontWeight="bold" mb="4px">
              70%
            </Text>
            <Text fontSize="sm">Organic Farm Market</Text>
          </Flex>
        </CircularProgressLabel>
      </CircularProgress>
    </Flex>
  );
};

export default PriceAddingPercentageCard;
