import {
  Box,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import ProductTableRow from "./ProductTableRow";
import ProductPriceRow from "./ProducePriceRow";
import { useTranslation } from "react-i18next";
import axios, { API_URL } from "../../config/general";
import { AuthUser } from "../../context/AuthContext";
import PopupNotification from "../Common/PopupNotification";

export type ProductInfo = {
  id: string;
  name: string;
  description: string;
  unit_of_measurement: string;
  created_at: string;
};

export type ProductPriceInfo = {
  id: string;
  name: string;
  price_value: number;
  updated_at: string;
};

type ProductInfoTableProps = {
  editingPrices: boolean;
  user: AuthUser;
};

const ProductInfoTable = ({ editingPrices, user }: ProductInfoTableProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { t } = useTranslation();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleOpenNotification = (success: boolean, message: string) => {
    setIsSuccess(success);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const captionsProducts = [
    t("product"),
    t("description"),
    t("unit"),
    t("addedAt"),
    "",
  ];
  const captionsPrices = [
    t("product"),
    t("currentPrice"),
    t("lastUpdated"),
    "",
    "",
  ];
  const captions = editingPrices ? captionsPrices : captionsProducts;

  const [marketId, setMarketId] = useState(null);

  const fetchUsersMarket = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/users/get-vendors-market?id=${user.userId}`
      );
      const fetchedMarket = response.data;
      if (fetchedMarket) {
        setMarketId(fetchedMarket[0].market_id);
      }
    } catch (error) {
      handleOpenNotification(false, "Error while detecting vendors market");
    }
  }, [setMarketId, user]);

  useEffect(() => {
    fetchUsersMarket();
  }, [fetchUsersMarket]);

  const [productData, setProductData] = useState<ProductInfo[] | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!editingPrices && marketId) {
      try {
        const response = await axios.get(
          `${API_URL}/products/get-products?market_id=${marketId}`
        );
        const fetchedProducts = response.data;
        if (fetchedProducts) {
          setProductData(fetchedProducts);
        }
      } catch (error) {
        handleOpenNotification(false, "Error while fetching products");
      }
    }
  }, [setProductData, marketId, editingPrices]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [productPriceData, setProductPriceData] = useState<
    ProductPriceInfo[] | null
  >(null);

  const fetchProductPrices = useCallback(async () => {
    if (editingPrices && marketId) {
      try {
        const response = await axios.get(
          `${API_URL}/products/get-product-prices?market_id=${marketId}`
        );
        const fetchedProductPrices = response.data;
        if (fetchedProductPrices) {
          setProductPriceData(fetchedProductPrices);
        }
      } catch (error) {
        handleOpenNotification(false, "Error while fetching product prices");
      }
    }
  }, [setProductPriceData, marketId, editingPrices]);

  useEffect(() => {
    fetchProductPrices();
  }, [fetchProductPrices]);

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Box p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {editingPrices ? t("addPrices") : t("productTable")}
          </Text>
        </Box>
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
              {!editingPrices &&
                productData &&
                productData.map((row: ProductInfo) => {
                  return (
                    <ProductTableRow
                      key={`${row.id}`}
                      id={row.id}
                      name={row.name}
                      description={row.description}
                      unit_of_measurement={row.unit_of_measurement}
                      created_at={row.created_at}
                    />
                  );
                })}
              {editingPrices &&
                productPriceData &&
                productPriceData.map((row: ProductPriceInfo) => {
                  return (
                    <ProductPriceRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      price_value={row.price_value}
                      updated_at={row.updated_at}
                    />
                  );
                })}
            </Tbody>
          </Table>
        </Box>
      </Box>
      <PopupNotification
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        isSuccess={isSuccess}
        message={notificationMessage}
      />
    </Flex>
  );
};

export default ProductInfoTable;
