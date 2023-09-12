import { Flex, useBreakpointValue } from "@chakra-ui/react";
import Sidebar from "../components/Common/Sidebar";
import EmployeeTable from "../components/User/EmployeeTable";

const Dashboard = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      minHeight="100vh"
      flexDirection={isSmallerScreen ? "column" : "row"}
      p={3}
    >
      <Sidebar />
      <Flex
        h={"95vh"}
        w={"80vw"}
        ml={8}
        mt={isSmallerScreen ? 6 : 1}
        bgColor="red.100"
        flexDirection={"column"}
      />
      <EmployeeTable />
    </Flex>
  );
};

export default Dashboard;
