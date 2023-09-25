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
import EmployeeTableRow from "./EmployeeTableRow";

type EmployeeInfo = {
  email: string;
  name: string;
  role: string;
  active: boolean;
  date: string;
};

const EmployeeTable = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["Employee", "Function", "Status", "Employed", ""];

  const employeesData = [
    {
      name: "Marko Markovic",
      email: "marko@example.com",
      role: "Admin",
      active: true,
      date: "14/06/21",
    },
    {
      name: "Janko Jankovic",
      email: "janko@example.com",
      role: "Vendor",
      active: true,
      date: "12/05/21",
    },
    {
      name: "Ana Ilic",
      email: "ana@example.com",
      role: "Admin",
      active: true,
      date: "07/06/21",
    },
    {
      name: "Aleksandar Obradovic",
      email: "aleksandar@example.com",
      role: "Admin, Vendor",
      active: true,
      date: "14/11/21",
    },
    {
      name: "Danijel Tomic",
      email: "danijel@example.com",
      role: "Vendor",
      active: false,
      date: "21/01/21",
    },
    {
      name: "Bojana Jerkovic",
      email: "bojana@example.com",
      role: "Admin, Vendor",
      active: true,
      date: "04/09/20",
    },
    {
      name: "Dani Tomic",
      email: "danijel@example.com",
      role: "Vendor",
      active: false,
      date: "21/01/21",
    },
    {
      name: "Boki Jerkovic",
      email: "bojana@example.com",
      role: "Admin, Vendor",
      active: true,
      date: "04/09/20",
    },
  ];

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Box p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {"Employees Table"}
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
              {employeesData.map((row: EmployeeInfo) => {
                return (
                  <EmployeeTableRow
                    key={`${row.email}-${row.name}`}
                    name={row.name}
                    email={row.email}
                    role={row.role}
                    active={row.active}
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
