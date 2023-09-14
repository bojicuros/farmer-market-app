import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
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
      <Box
        h={isSmallerScreen ? undefined : "95vh"}
        minH={isSmallerScreen ? "95vh" : undefined}
        w={"80vw"}
        ml={8}
        mt={isSmallerScreen ? 6 : 1}
        flexDirection={"column"}
        overflowY={isSmallerScreen ? "hidden" : "auto"}
      >
        <EmployeeTable />
      </Box>
    </Flex>
  );
};

export default Dashboard;
