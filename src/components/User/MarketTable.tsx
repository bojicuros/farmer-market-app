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
import MarketTableRow from "./MarketTableRow";

export type MarketInfo = {
  name: string;
  address: string;
  is_open: boolean;
  date: string;
};

const MarketTable = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Market", "Status", "Opened at", ""];

  const employeesData = [
    {
      name: "Farmers Market",
      address: "Dr. Mladena Stojanovica, Banja Luka",
      is_open: true,
      date: "14/06/21",
    },
    {
      name: "Organic Market",
      address: "Dr. Mladena Stojanovica, Banja Luka",
      is_open: false,
      date: "14/06/21",
    },
    {
      name: "Local Market",
      address: "Dr. Mladena Stojanovica, Banja Luka",
      is_open: true,
      date: "14/06/21",
    },
  ];

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Box p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {"Markets Table"}
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
              {employeesData.map((row: MarketInfo) => {
                return (
                  <MarketTableRow
                    key={`${row.name}-${row.date}`}
                    name={row.name}
                    address={row.address}
                    is_open={row.is_open}
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

export default MarketTable;
