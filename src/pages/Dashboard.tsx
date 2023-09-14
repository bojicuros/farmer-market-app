import { useState } from "react";
import Sidebar from "../components/Common/Sidebar";
import EmployeeTable from "../components/User/EmployeeTable";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { MenuItems } from "../util/enums";

const Dashboard = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const [activeItem, setActiveItem] = useState("");

  return (
    <Flex
      minHeight="100vh"
      flexDirection={isSmallerScreen ? "column" : "row"}
      p={3}
    >
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <Box
        h={isSmallerScreen ? undefined : "95vh"}
        minH={isSmallerScreen ? "95vh" : undefined}
        w={"80vw"}
        ml={8}
        mt={isSmallerScreen ? 6 : 1}
        flexDirection={"column"}
        overflowY={isSmallerScreen ? "hidden" : "auto"}
      >
        {activeItem === MenuItems.ManageEmployees && <EmployeeTable />}
      </Box>
    </Flex>
  );
};

export default Dashboard;
