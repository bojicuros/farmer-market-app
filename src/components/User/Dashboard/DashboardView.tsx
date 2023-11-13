import { Box, Flex, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import DashboardInfoCard from "./DashboardInfoCard";
import { BsCoin } from "react-icons/bs";
import { BiStore } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import PriceAddingPercentageCard from "./PriceAddingPercentageCard";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import axios, { API_URL } from "../../../config/general";

export type MarketPricePercentage = {
  market: string;
  percentage: number | null;
};

type DashboardInfo = {
  num_of_markets: number;
  num_of_products: number;
  num_of_employees: number;
  num_of_price_today: number;
  market_price_percentage: MarketPricePercentage[];
};

const DashboardView = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo | null>(
    null
  );

  const fetchDashboardInfo = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/dashboard`);
      if (response.status === 200) setDashboardInfo(response.data);
      else
        toast({
          title: t("error"),
          description: t("errorDashboardInfo"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorDashboardInfo"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  }, [setDashboardInfo, t, toast]);

  useEffect(() => {
    fetchDashboardInfo();
  }, [fetchDashboardInfo]);

  return (
    <Flex flexDirection="column" pt={{ base: "40px", md: "20px" }}>
      <Box p="6px 0px 22px 0px">
        <Text fontSize="xl" fontWeight="bold">
          {t("dashboard")}
        </Text>
      </Box>
      <SimpleGrid
        columns={{ sm: 1, md: 2, xl: 4 }}
        spacing="24px"
        alignContent={"center"}
        justifyContent={"center"}
      >
        <DashboardInfoCard
          key="Markets"
          title="Markets"
          amount={dashboardInfo ? dashboardInfo.num_of_markets : 0}
          icon={BiStore}
        />
        <DashboardInfoCard
          key="Product"
          title="Product"
          amount={dashboardInfo ? dashboardInfo.num_of_products : 0}
          icon={BsFillBagCheckFill}
        />
        <DashboardInfoCard
          key="Prices added today"
          title="Prices added today"
          amount={dashboardInfo ? dashboardInfo.num_of_price_today : 0}
          icon={BsCoin}
        />
        <DashboardInfoCard
          key="Employees"
          title="Employees"
          amount={dashboardInfo ? dashboardInfo.num_of_employees : 0}
          icon={FaUsers}
        />
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
        {dashboardInfo &&
          dashboardInfo.market_price_percentage.map(
            (marketPercentage: MarketPricePercentage) => (
              <PriceAddingPercentageCard
                key={marketPercentage.market}
                market={marketPercentage.market}
                percentage={marketPercentage.percentage}
              />
            )
          )}
      </SimpleGrid>
    </Flex>
  );
};

export default DashboardView;
