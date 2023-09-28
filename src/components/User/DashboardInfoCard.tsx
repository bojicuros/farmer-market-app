import {
  Box,
  Flex,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  useColorMode,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

type DashboardInfoCardProps = {
  title: string;
  amount: number;
  icon: IconType;
};

const DashboardInfoCard = ({ title, amount, icon }: DashboardInfoCardProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box minH="83px" borderWidth="1px" borderRadius={"xl"} mr={1}>
      <Flex
        flexDirection="row"
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

export default DashboardInfoCard;
