import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Heading,
  Spacer,
  useBreakpointValue,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios, { API_URL } from "../../config/general";
import { useTranslation } from "react-i18next";

type SearchRecord = {
  type: string;
  market_name: string;
  product_name: string;
};

const Search = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState<SearchRecord[]>([]);
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/search?query=${encodeURIComponent(query)}`
          );
          setSearchResults(response.data);
        } catch (error) {
          toast({
            title: t("error"),
            description: t("errorPerformingSearch"),
            status: "error",
            duration: 1500,
            position: "top",
            isClosable: true,
          });
        }
      };
      fetchSearchResults();
    }
  }, [query, t, toast]);

  const markets = searchResults.filter((result) => result.type === "Market");
  const products = searchResults.filter((result) => result.type === "Product");

  return (
    <Flex
      direction="column"
      mt="8"
      p={5}
      w={isSmallerScreen ? undefined : "60%"}
    >
      {searchResults.length > 0 ? (
        <Flex
          direction={isSmallerScreen ? "column" : "row"}
          alignContent={"center"}
          justifyContent={"center"}
        >
          {products.length > 0 && (
            <Flex
              direction={"column"}
              w={
                markets.length === 0
                  ? isSmallerScreen
                    ? undefined
                    : "60%"
                  : undefined
              }
              mb={isSmallerScreen ? "6" : undefined}
              mr={6}
            >
              <Heading size="xl" mb={3}>
                {t("products")}
              </Heading>
              <HStack mb={2}>
                <Text fontSize={"lg"} fontWeight="bold">
                  {t("name")}
                </Text>
                <Spacer />
                <Text fontSize={"lg"} fontWeight="bold">
                  {t("availableAt")}
                </Text>
              </HStack>
              {products.map((product, index) => (
                <HStack key={`product-${index}`} mb={1}>
                  <Text fontSize={"md"}>{product.product_name}</Text>
                  <Spacer />
                  <Text>{product.market_name}</Text>
                </HStack>
              ))}
            </Flex>
          )}
          {products.length > 0 && <Spacer />}
          {markets.length > 0 && (
            <Box>
              <Heading size="xl" mb={3}>
                {t("availableMarkets")}
              </Heading>
              {markets.map((market, index) => (
                <Text key={`market-${index}`} mb={1}>
                  {market.market_name}
                </Text>
              ))}
            </Box>
          )}
        </Flex>
      ) : (
        <Flex w="100%" justifyContent={"center"}>
          <Text fontSize={"xl"} mt={10}>
            {t("noResults")}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Search;
