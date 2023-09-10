import { Flex, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isSmallerScreen);

  return (
    <Flex
      h={isSmallerScreen ? (isSidebarCollapsed ? "10" : "80vh") : "95vh"}
      marginTop="1"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius="30px"
      w={isSmallerScreen ? (isSidebarCollapsed ? "16" : "70%") : "250px"}
      flexDir="column"
      justifyContent="space-between"
      bgGradient={"linear(to-tr, green.500, yellow.300)"}
    >
      <SidebarMenu
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
    </Flex>
  );
};

export default Sidebar;
