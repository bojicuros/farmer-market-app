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
} from "@chakra-ui/react";
import MarketTableRow from "./MarketTableRow";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import axios, { API_URL } from "../../config/general";
import AddMarketForm from "./AddMarketForm";
import PopupNotification from "../Common/PopupNotification";

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

  const [refresh, setRefresh] = useState(false);
  const [markets, setMarkets] = useState<MarketInfo[] | null>(null);
  const [addingMarket, setAddingMarket] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleOpenNotification = (success: boolean, message: string) => {
    setIsSuccess(success);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const handleChildAction = () => {
    setTimeout(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, 1500);
  };

  const fetchMarkets = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/markets/get-all`);

      if (response.data.length > 0) {
        setMarkets(response.data);
      }
    } catch (error) {
      handleOpenNotification(false, "Error fetching markets");
    }
  }, []);

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
        handleOpenNotification={handleOpenNotification}
        onChildAction={handleChildAction}
      ></AddMarketForm>
       <PopupNotification
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        isSuccess={isSuccess}
        message={notificationMessage}
      />
    </Flex>
  );
};

export default MarketTable;
