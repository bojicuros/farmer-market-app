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
};

const ProductInfoTable = ({ editingPrices }: ProductInfoTableProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { t } = useTranslation();
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

  const [productData, setProductData] = useState<ProductInfo[] | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/products/get-products?market_id=${"8606fa9b-8c02-4638-ba17-dcff5fcd531d"}`
      );
      const fetchedProducts = response.data;
      if (fetchedProducts) {
        console.log(fetchedProducts);
        setProductData(fetchedProducts);
      }
    } catch (error) {
      console.error("Error fetching markets:", error);
    }
  }, [setProductData]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [productPriceData, setProductPriceData] = useState<
    ProductPriceInfo[] | null
  >(null);

  const fetchProductPrices = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/products/get-product-prices?market_id=${"8606fa9b-8c02-4638-ba17-dcff5fcd531d"}`
      );
      const fetchedProductPrices = response.data;
      if (fetchedProductPrices) {
        setProductPriceData(fetchedProductPrices);
      }
    } catch (error) {
      console.error("Error fetching markets:", error);
    }
  }, [setProductPriceData]);

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
    </Flex>
  );
};

export default ProductInfoTable;
