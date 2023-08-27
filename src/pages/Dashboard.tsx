import { Flex, useBreakpointValue } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {

  const isSmallerScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Flex minHeight="100vh" flexDirection={isSmallerScreen ? "column" : "row"}>
        <Sidebar />
    </Flex>
  );
};

export default Dashboard;
