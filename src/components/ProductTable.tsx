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
  } from "@chakra-ui/react";
  import { useState } from "react";

  type Product = {
    id: number,
    name: string,
    price: number,
    measureUnit: string
  };
  
  export const ProductTable = () => {
    const { colorMode } = useColorMode();
    const isSmallerScreen = useBreakpointValue({ base: true, md: false });
    const [sortConfig, setSortConfig] = useState({ key: "name", direction: "" });

    
  
    const products = [
      { name: "Apples", price: 2.99, measureUnit: "Kilos", id: 1 },
      { name: "Carrots", price: 1.49, measureUnit: "Bags", id: 2 },
      { name: "Tomatoes", price: 3.75, measureUnit: "Kilos", id: 3 },
      { name: "Apples", price: 2.99, measureUnit: "Kilos", id: 4 },
      { name: "Carrots", price: 1.49, measureUnit: "Bags", id: 5 },
      { name: "Tomatoes", price: 3.75, measureUnit: "Kilos", id: 6 },
      { name: "Apples", price: 2.99, measureUnit: "Kilos", id: 7 },
      { name: "Carrots", price: 1.49, measureUnit: "Bags", id: 8 },
      { name: "Tomatoes", price: 3.75, measureUnit: "Kilos", id: 9 },
      { name: "Apples", price: 2.99, measureUnit: "Kilos", id: 10 },
      { name: "Carrots", price: 1.49, measureUnit: "Bags", id: 11 },
      { name: "Tomatoes", price: 3.75, measureUnit: "Kilos", id: 12 },
    ] as Product[];
  
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
  
    return (
      <TableContainer
        mt={10}
        w={isSmallerScreen ? undefined : "60%"}
      >
        <Table cursor={"normal"}>
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
  