import {
  Box,
  Flex,
  Icon,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorMode,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

type StatisticCardSmallProps = {
  title: string;
  amount: number;
  percentage: number;
  icon: IconType;
};

const StatisticCardSmall = ({
  title,
  amount,
  percentage,
  icon,
}: StatisticCardSmallProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      minH="83px"
      bg={colorMode === "light" ? "gray.100" : "gray.700"}
      borderRadius={"5%"}
      mr={1}
    >
      <Flex
        flexDirection="row"
        alignContent="center"
        justifyContent="center"
        w="100%"
        p={5}
      >
        <Stat me="auto">
          <StatLabel
            fontSize="sm"
            color={colorMode === "light" ? "gray.600" : "gray.400"}
            fontWeight="bold"
          >
            {title}
          </StatLabel>
          <Flex>
            <StatNumber
              fontSize="lg"
              color={colorMode === "light" ? "gray.700" : "gray.200"}
              pl={2}
            >
              {amount}
            </StatNumber>
            <StatHelpText
              alignSelf="flex-end"
              justifySelf="flex-end"
              m="0px"
              color={percentage > 0 ? "green.400" : "red.400"}
              fontWeight="bold"
              ps="3px"
              fontSize="md"
              pl={3}
            >
              {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
            </StatHelpText>
          </Flex>
        </Stat>
        <Icon
          as={icon}
          h={"45px"}
          w={"45px"}
          color={colorMode === "light" ? "green.500" : "green.400"}
        />
      </Flex>
    </Box>
  );
};

export default StatisticCardSmall;
