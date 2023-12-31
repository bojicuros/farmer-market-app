import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import MarketTableRow from "./MarketTableRow";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { axiosPrivate } from "../../../config/general";
import AddMarketForm from "./AddMarketForm";

export type MarketInfo = {
  id: string;
  name: string;
  address: string;
  is_open: boolean;
  created_at: string;
};

const MarketTable = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const captions = [t("market"), t("status"), t("openedAt"), ""];
  const toast = useToast();

  const [refresh, setRefresh] = useState(false);
  const [markets, setMarkets] = useState<MarketInfo[] | null>(null);
  const [addingMarket, setAddingMarket] = useState(false);

  const handleChildAction = () => {
    setTimeout(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, 1500);
  };

  const fetchMarkets = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(`/markets/get-all`);

      if (response.status === 200) setMarkets(response.data);
      else
        toast({
          title: t("error"),
          description: t("errorFetchingMarkets"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
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
  }, [t, toast]);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets, refresh]);

  const showAddingMarketForm = () => {
    setAddingMarket(true);
  };

  const hideAddingMarketForm = () => {
    setAddingMarket(false);
  };

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Flex
          p="6px 0px 22px 0px"
          align={"row"}
          justifyContent={"space-between"}
        >
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {t("marketsTable")}
          </Text>
          <Button
            bg={colorMode === "light" ? "green.400" : "green.500"}
            _hover={{
              bg: colorMode === "light" ? "green.500" : "green.600",
            }}
            color={colorMode === "light" ? "white" : "gray.900"}
            onClick={showAddingMarketForm}
            mr={6}
          >
            {t("addMarket")}
          </Button>
        </Flex>
        <Box>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                {captions.map((caption: string, index: number) => {
                  return (
                    <Th
                      color="gray.400"
                      key={index}
                      ps={index === 0 ? "0px" : undefined}
                    >
                      {caption}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {markets?.map((row: MarketInfo) => {
                return (
                  <MarketTableRow
                    key={row.id}
                    id={row.id}
                    name={row.name}
                    address={row.address}
                    is_open={row.is_open}
                    created_at={row.created_at}
                    onChildAction={handleChildAction}
                  />
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Box>
      <AddMarketForm
        isOpen={addingMarket}
        close={hideAddingMarketForm}
        onChildAction={handleChildAction}
      ></AddMarketForm>
    </Flex>
  );
};

export default MarketTable;
