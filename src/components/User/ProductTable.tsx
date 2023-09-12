import {
  TableContainer,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  useColorMode,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios, { API_URL } from "../../config/general";

type Product = {
  id: string;
  name: string;
  price: number;
  measureUnit: string;
};

interface ProductTableProps {
  activeMarket: string | null;
}

export const ProductTable = ({ activeMarket }: ProductTableProps) => {
  const { colorMode } = useColorMode();
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "" });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProductsAndPrices() {
      if (!activeMarket) return;

      try {
        const response = await axios.get(
          `${API_URL}/prices/get-latest-prices?market_id=${activeMarket}`
        );

        const fetchedProducts = response.data.map((priceData: any) => ({
          name: priceData.product.name,
          price: priceData.price_value,
          measureUnit: priceData.product.unit_of_measurement,
          id: priceData.product.id,
        }));

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    }

    fetchProductsAndPrices();
  }, [activeMarket]);

  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof Product];
    const bValue = b[sortConfig.key as keyof Product];

    if (typeof aValue === "string" && typeof bValue === "string") {
      if (sortConfig.direction === "asc") {
        return aValue.localeCompare(bValue);
      }
      if (sortConfig.direction === "desc") {
        return bValue.localeCompare(aValue);
      }
    } else {
      if (sortConfig.direction === "asc") {
        return (aValue as number) - (bValue as number);
      }
      if (sortConfig.direction === "desc") {
        return (bValue as number) - (aValue as number);
      }
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if(activeMarket === null){
    return <></>
  }

  if (products.length === 0) {
    return <Box mt={10}>Currently there are no products in this market.</Box>;
  }

  return (
    <TableContainer mt={10} w={isSmallerScreen ? undefined : "60%"}>
      <Table>
        <Thead>
          <Tr cursor={"pointer"}>
            <Th
              textAlign={"center"}
              _hover={{
                color: colorMode === "light" ? "green.600" : "green.200",
              }}
              onClick={() => requestSort("name")}
            >
              Name
            </Th>
            <Th
              textAlign={"center"}
              _hover={{
                color: colorMode === "light" ? "green.600" : "green.200",
              }}
              onClick={() => requestSort("price")}
            >
              Price
            </Th>
            <Th
              textAlign={"center"}
              _hover={{
                color: colorMode === "light" ? "green.600" : "green.200",
              }}
              onClick={() => requestSort("measureUnit")}
            >
              Measure unit
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedProducts.map((product) => (
            <Tr key={product.id}>
              <Td textAlign={"center"}>{product.name}</Td>
              <Td textAlign={"center"}>{product.price.toFixed(2)} KM</Td>
              <Td textAlign={"center"}>{product.measureUnit}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
