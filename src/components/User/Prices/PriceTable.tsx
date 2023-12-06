import {
  Box,
  Button,
  Flex,
  HStack,
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
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { axiosPrivate } from "../../../config/general";
import { AuthUser } from "../../../context/AuthContext";
import PriceTableRow from "./PriceTableRow";
import PriceEditRow from "./PriceEditRow";

type ProductInfoTableProps = {
  user: AuthUser;
};

export type PriceInfo = {
  product_id: string;
  product_name: string;
  market_id: string;
  market_name: string;
  latest_price: number | null;
};

export type PriceEditInfo = {
  id: string;
  price_value: number;
  price_date: string;
  product_name: string;
  market_name: string;
};

const PriceTable = ({ user }: ProductInfoTableProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const toast = useToast();
  const [refresh, setRefresh] = useState(false);

  const [pricesEditing, arePricesEditing] = useState(false);

  const captions = [t("product"), t("currentPrice"), t("market"), "", ""];

  const handleChildAction = () => {
    setTimeout(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, 1500);
  };

  const [priceData, setPriceData] = useState<PriceInfo[] | null>(null);

  const fetchPriceInfo = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(
        `/prices/get-products-without-todays-prices?user_id=${user.userId}`
      );
      if (response.status === 200) setPriceData(response.data);
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorFetchingPrices"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  }, [setPriceData, user, t, toast]);

  useEffect(() => {
    fetchPriceInfo();
  }, [fetchPriceInfo, refresh]);

  const [priceEditData, setPriceEditData] = useState<PriceEditInfo[] | null>(
    null
  );

  const fetchPriceEditInfo = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(
        `/prices/get-todays-user-prices?user_id=${user.userId}`
      );
      if (response.status === 200) setPriceEditData(response.data);
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorFetchingPrices"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  }, [setPriceEditData, user, t, toast]);

  useEffect(() => {
    fetchPriceEditInfo();
  }, [fetchPriceEditInfo, refresh]);

  const keepPricesForUser = async () => {
    try {
      const response = await axiosPrivate.post(
        `/prices/keep-prices?user_id=${user.userId}`
      );
      if (response.status === 200) {
        setRefresh((prevRefresh) => !prevRefresh);
        toast({
          title: t("success"),
          description: t("pricesSuccessfullyAdded"),
          status: "success",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
      } else
        toast({
          title: t("error"),
          description: t("errorAddingPrices"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorAddingPrices"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Flex
          p="6px 0px 22px 0px"
          align={"row"}
          justifyContent={"space-between"}
        >
          <HStack>
            <Text
              fontSize="xl"
              color={pricesEditing ? "gray.400" : textColor}
              fontWeight="bold"
              cursor={"pointer"}
              onClick={() => arePricesEditing(false)}
            >
              {t("addTodaysPrices")}
            </Text>
            <Text
              fontSize="xl"
              color={pricesEditing ? textColor : "gray.400"}
              fontWeight="bold"
              ml={2}
              cursor={"pointer"}
              onClick={() => arePricesEditing(true)}
            >
              {t("editPrices")}
            </Text>
          </HStack>
          {!pricesEditing &&
            priceData &&
            priceData.some((item) => item.latest_price !== null) && (
              <Button
                bg={colorMode === "light" ? "green.400" : "green.500"}
                _hover={{
                  bg: colorMode === "light" ? "green.500" : "green.600",
                }}
                color={colorMode === "light" ? "white" : "gray.900"}
                onClick={keepPricesForUser}
                mr={6}
              >
                {t("keepAllPrices")}
              </Button>
            )}
        </Flex>
        <Box>
          {(priceData && priceData.length > 0) ||
          (priceEditData && priceEditData.length > 0) ? (
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  {captions.map((caption: string, index: number) => (
                    <Th
                      color="gray.400"
                      key={index}
                      ps={index === 0 ? "0px" : undefined}
                    >
                      {caption}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {pricesEditing
                  ? priceEditData &&
                    priceEditData.map((row: PriceEditInfo) => (
                      <PriceEditRow
                        key={row.id}
                        id={row.id}
                        price_value={row.price_value}
                        price_date={row.price_date}
                        product_name={row.product_name}
                        market_name={row.market_name}
                        user_id={user.userId}
                        onChildAction={handleChildAction}
                      />
                    ))
                  : priceData &&
                    priceData.map((row: PriceInfo, index: number) => (
                      <PriceTableRow
                        key={index}
                        product_id={row.product_id}
                        product_name={row.product_name}
                        market_id={row.market_id}
                        market_name={row.market_name}
                        latest_price={row.latest_price}
                        user_id={user.userId}
                        onChildAction={handleChildAction}
                      />
                    ))}
              </Tbody>
            </Table>
          ) : (
            <Text mt={5} ml={5}>
              {pricesEditing ? t("noTodaysPrices") : t("noTodaysPricesToEdit")}
            </Text>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default PriceTable;
