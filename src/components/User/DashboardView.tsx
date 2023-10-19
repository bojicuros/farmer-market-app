import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import DashboardInfoCard from "./DashboardInfoCard";
import { BsCoin } from "react-icons/bs";
import { BiStore } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import PriceAddingPercentageCard from "./PriceAddingPercentageCard";
import { useTranslation } from "react-i18next";

const DashboardView = () => {
  const { t } = useTranslation();

  return (
    <Flex flexDirection="column" pt={{ base: "40px", md: "20px" }}>
      <Box p="6px 0px 22px 0px">
        <Text fontSize="xl" fontWeight="bold">
          {"Dashboard"}
        </Text>
      </Box>
      <SimpleGrid
        columns={{ sm: 1, md: 2, xl: 4 }}
        spacing="24px"
        alignContent={"center"}
        justifyContent={"center"}
      >
        <DashboardInfoCard title="Markets" amount={3} icon={BiStore} />
        <DashboardInfoCard
          title="Product"
          amount={23}
          icon={BsFillBagCheckFill}
        />
        <DashboardInfoCard
          title="Prices added today"
          amount={25}
          icon={BsCoin}
        />
        <DashboardInfoCard title="Employees" amount={10} icon={FaUsers} />
      </SimpleGrid>
      <Text fontSize="large" mt={16} mb={10}>
        {t("percentageOfPrices")}
      </Text>{" "}
      <SimpleGrid
        columns={{ sm: 1, md: 2, xl: 3 }}
        spacing={5}
        borderWidth="1px"
        borderRadius={"xl"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <PriceAddingPercentageCard />
        <PriceAddingPercentageCard />
        <PriceAddingPercentageCard />
      </SimpleGrid>
    </Flex>
  );
};

export default DashboardView;
