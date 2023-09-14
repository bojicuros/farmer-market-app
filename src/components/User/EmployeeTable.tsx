import { Flex } from "@chakra-ui/react";
import Employees from "./Employees";

const EmployeeTable = () => {
  const tablesTableData = [
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
    <Flex direction="column" pt={{ base: "30px", md: "0px" }}>
      <Employees
        title={"Employees Table"}
        captions={["Employee", "Function", "Status", "Employed", ""]}
        data={tablesTableData}
      />
    </Flex>
  );
};

export default EmployeeTable;
