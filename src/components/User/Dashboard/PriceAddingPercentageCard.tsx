import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { MarketPricePercentage } from "./DashboardView";

const PriceAddingPercentageCard = ({
  market,
  percentage,
}: MarketPricePercentage) => {
  const { colorMode } = useColorMode();
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const color = typeof percentage === "number" ? "green" : "red";

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
        value={typeof percentage === "number" ? percentage : 100}
        thickness={6}
        color={colorMode === "light" ? `${color}.400` : `${color}.500`}
      >
        <CircularProgressLabel>
          <Flex direction="column" justify="center" align="center">
            {typeof percentage === "number" ? (
              <Text fontSize={"4xl"} fontWeight="bold" mb="4px">
                {`${percentage}%`}
              </Text>
            ) : (
              <Text fontSize={"sm"} fontWeight="bold" mb="4px">
                {"There are no products"}
                <br />
                {"in this market"}
              </Text>
            )}

            <Text fontSize="sm">{market}</Text>
          </Flex>
        </CircularProgressLabel>
      </CircularProgress>
    </Flex>
  );
};

export default PriceAddingPercentageCard;
