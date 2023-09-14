import {
  Box,
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

type EmployeesProps = {
  title: string;
  captions: string[];
  data: EmployeeInfo[];
};

const Employees = ({ title, captions, data }: EmployeesProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
      <Box p="6px 0px 22px 0px">
        <Text fontSize="xl" color={textColor} fontWeight="bold">
          {title}
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
            {data.map((row: EmployeeInfo) => {
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
  );
};

export default Employees;
