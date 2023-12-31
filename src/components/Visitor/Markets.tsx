import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { MarketCard } from "./MarketCard";
import axios  from "../../config/general";
import { useTranslation } from "react-i18next";

export interface Market {
  id: string;
  name: string;
  image_url: string;
  isActive: boolean;
}
interface MarketsProps {
  setActiveMarket: (id: string | null) => void;
}

export const Markets = ({ setActiveMarket }: MarketsProps) => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const { t } = useTranslation();
  const toast = useToast();

  const fetchMarkets = useCallback(async () => {
    try {
      const response = await axios.get(`/markets/get-all-open`);
      const fetchedMarkets = response.data.map(
        (market: Market, index: number) => ({
          ...market,
          isActive: index === 0,
        })
      );
      setMarkets(fetchedMarkets);

      if (fetchedMarkets.length > 0) {
        setActiveMarket(fetchedMarkets[0].id);
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorFetchingMarkets"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  }, [setActiveMarket, t, toast]);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  function toggleActive(id: string) {
    setMarkets((oldMarkets) =>
      oldMarkets.map((market) =>
        market.id === id
          ? { ...market, isActive: true }
          : { ...market, isActive: false }
      )
    );
    setActiveMarket(id);
  }

  const paddingValue = useBreakpointValue({ base: 0, md: 20, lg: 32 });
  const paddingText = useBreakpointValue({ base: 0, md: 12, lg: 0 });

  if (markets.length === 0) {
    return <Box mt={10}>{t("allMarketsClosed")}</Box>;
  }

  return (
    <Flex
      direction={"column"}
      alignContent="center"
      px={paddingValue}
      w={"100%"}
    >
      <Text
        fontWeight="bold"
        fontSize="2xl"
        pl={paddingText}
        mt={paddingValue === 0 ? 10 : 0}
      >
        {t("checkMarkets")}
      </Text>
      <SimpleGrid
        spacing={10}
        minChildWidth={"300px"}
        minWidth={"70vw"}
        p={paddingValue === 0 ? 10 : 0}
        mt={paddingValue === 0 ? 0 : 10}
        justifyContent={"center"}
      >
        {markets.map((market) => (
          <MarketCard
            key={market.id}
            name={market.name}
            img_url={market.image_url}
            isActive={market.isActive}
            toggleActive={() => toggleActive(market.id)}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};
