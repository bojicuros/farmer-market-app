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
import ProductTableRow from "./ProductTableRow";

export type ProductInfo = {
  name: string;
  description: string;
  unit_of_measurement: string;
  date: string;
};

const EmployeeTable = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Product", "Description", "Unit", "Added at", ""];

  const productData: ProductInfo[] = [
    {
      name: "Apples",
      description: "Fresh apples",
      unit_of_measurement: "kilo",
      date: "14/06/21",
    },
    {
      name: "Bananas",
      description: "Ripe bananas",
      unit_of_measurement: "bunch",
      date: "15/06/21",
    },
    {
      name: "Oranges",
      description: "Juicy oranges",
      unit_of_measurement: "dozen",
      date: "16/06/21",
    },
    {
      name: "Grapes",
      description: "Sweet grapes",
      unit_of_measurement: "kilo",
      date: "17/06/21",
    },
    {
      name: "Strawberries",
      description: "Fresh strawberries",
      unit_of_measurement: "pound",
      date: "18/06/21",
    },
    {
      name: "Pineapples",
      description: "Ripe pineapples",
      unit_of_measurement: "each",
      date: "19/06/21",
    },
    {
      name: "Mangos",
      description: "Tropical mangos",
      unit_of_measurement: "each",
      date: "20/06/21",
    },
    {
      name: "Watermelons",
      description: "Large watermelons",
      unit_of_measurement: "each",
      date: "21/06/21",
    },
    {
      name: "Blueberries",
      description: "Fresh blueberries",
      unit_of_measurement: "pound",
      date: "22/06/21",
    },
  ];

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Box p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {"Product Table"}
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
              {productData.map((row: ProductInfo) => {
                return (
                  <ProductTableRow
                    key={`${row.name}-${row.date}`}
                    name={row.name}
                    description={row.description}
                    unit_of_measurement={row.unit_of_measurement}
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

export default EmployeeTable;
