import { Flex, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isSmallerScreen);

  return (
    <Flex
      pos="absolute"
      left="5"
      top="3"
      h={isSidebarCollapsed ? "10" : "95vh"}
      marginTop="1"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius="30px"
      w={isSmallerScreen ? (isSidebarCollapsed ? "15" : "70%") : "220px"}
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
