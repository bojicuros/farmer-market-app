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
  name: string;
  current_price: number;
  date: string;
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

  const productPriceData: ProductPriceInfo[] = [
    {
      name: "Apples",
      current_price: 2.34,
      date: "14/06/21",
    },
    {
      name: "Bananas",
      current_price: 3.64,
      date: "15/06/21",
    },
    {
      name: "Oranges",
      current_price: 3.69,
      date: "16/06/21",
    },
    {
      name: "Grapes",
      current_price: 5.26,
      date: "17/06/21",
    },
    {
      name: "Strawberries",
      current_price: 3.64,
      date: "18/06/21",
    },
    {
      name: "Pineapples",
      current_price: 3.64,
      date: "19/06/21",
    },
    {
      name: "Mangos",
      current_price: 3.64,
      date: "20/06/21",
    },
    {
      name: "Watermelons",
      current_price: 3.64,
      date: "21/06/21",
    },
    {
      name: "Blueberries",
      current_price: 3.64,
      date: "22/06/21",
    },
  ];

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
                productPriceData.map((row: ProductPriceInfo) => {
                  return (
                    <ProductPriceRow
                      key={`${row.name}-${row.date}`}
                      name={row.name}
                      current_price={row.current_price}
                      date={row.date}
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
