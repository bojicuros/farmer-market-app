import { Flex, SimpleGrid, Text, useBreakpointValue } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { MarketCard } from "./MarketCard";

export const Markets = () => {
  const marketsData = [
    { name: "Market 1", isActive: true, id: nanoid() },
    { name: "Market 2", isActive: false, id: nanoid() },
    { name: "Market 3", isActive: false, id: nanoid() },
  ];

  const [markets, setMarkets] = useState(marketsData);

  function toggleActive(id: string) {
    setMarkets((oldMarkets) =>
      oldMarkets.map((market) =>
        market.id === id
          ? { ...market, isActive: true }
          : { ...market, isActive: false }
      )
    );
  }

  const paddingValue = useBreakpointValue({ base: 0, md: 20, lg: 32 });
  const paddingText = useBreakpointValue({ base: 0, md: 12, lg: 0 });

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
        Check out our markets:
      </Text>
      <SimpleGrid
        spacing={10}
        minChildWidth={"300px"}
        minWidth={"70vw"}
        p={paddingValue === 0 ? 10 : 0}
        mt={paddingValue === 0 ? 0 : 10}
      >
        {markets.map((market) => (
          <MarketCard
            key={market.id}
            name={market.name}
            isActive={market.isActive}
            toggleActive={() => toggleActive(market.id)}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};
