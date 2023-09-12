// Chakra imports
import { Flex } from "@chakra-ui/react";
import Employees from "./Employees";

const EmployeeTable = () => {
  const tablesTableData = [
    {
      logo: "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
      name: "Esthera Jackson",
      email: "alexa@simmmple.com",
      subdomain: "Manager",
      domain: "Organization",
      status: "Online",
      date: "14/06/21",
    },
    {
      logo: "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
      name: "Alexa Liras",
      email: "laurent@simmmple.com",
      subdomain: "Programmer",
      domain: "Developer",
      status: "Offline",
      date: "12/05/21",
    },
    {
      logo: "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
      name: "Laurent Michael",
      email: "laurent@simmmple.com",
      subdomain: "Executive",
      domain: "Projects",
      status: "Online",
      date: "07/06/21",
    },
    {
      logo: "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
      name: "Freduardo Hill",
      email: "freduardo@simmmple.com",
      subdomain: "Manager",
      domain: "Organization",
      status: "Online",
      date: "14/11/21",
    },
    {
      logo: "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
      name: "Daniel Thomas",
      email: "daniel@simmmple.com",
      subdomain: "Programmer",
      domain: "Developer",
      status: "Offline",
      date: "21/01/21",
    },
    {
      logo: "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
      name: "Mark Wilson",
      email: "mark@simmmple.com",
      subdomain: "Designer",
      domain: "UI/UX Design",
      status: "Offline",
      date: "04/09/20",
    },
  ];

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Employees
        title={"Employees Table"}
        captions={["Employee", "Function", "Status", "Employed", ""]}
        data={tablesTableData}
      />
    </Flex>
  );
};

export default EmployeeTable;
