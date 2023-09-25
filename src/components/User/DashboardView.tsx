import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import DashboardInfoCard from "./DashboardInfoCard";
import { FaUsers } from "react-icons/fa";

const DashboardView = () => {
  return (
    <Flex flexDirection="column" pt={{ base: "40px", md: "20px" }}>
      <Box p="6px 0px 22px 0px">
        <Text fontSize="xl" color={"white"} fontWeight="bold">
          {"Dashboard"}
        </Text>
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <DashboardInfoCard
          title="proba"
          amount={3}
          percentage={55}
          icon={FaUsers}
        />
        <DashboardInfoCard
          title="proba"
          amount={3}
          percentage={55}
          icon={FaUsers}
        />
        <DashboardInfoCard
          title="proba"
          amount={3}
          percentage={55}
          icon={FaUsers}
        />
        <DashboardInfoCard
          title="proba"
          amount={3}
          percentage={55}
          icon={FaUsers}
        />
      </SimpleGrid>
    </Flex>
  );
};

export default DashboardView;
