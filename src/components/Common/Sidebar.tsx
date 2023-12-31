import { Flex, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import { Auth, AuthUser, UserInfo } from "../../context/AuthContext";

type SidebarProps = {
  activeItem: string;
  setActiveItem: (arg0: string) => void;
  user: AuthUser;
  setAuth: (auth: Auth | null) => void;
  userInfo: UserInfo | null;
};

const Sidebar = ({
  activeItem,
  setActiveItem,
  user,
  setAuth,
  userInfo
}: SidebarProps) => {
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const [isMediumScreen] = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px)"
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isSmallerScreen);

  return (
    <Flex
      h={isSidebarCollapsed ? "10" : "95vh"}
      marginTop="1"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius="30px"
      w={
        isSmallerScreen
          ? isSidebarCollapsed
            ? "16"
            : "70%"
          : isMediumScreen
          ? "290px"
          : "250px"
      }
      flexDir="column"
      justifyContent="space-between"
      bgGradient={"linear(to-tr, green.500, yellow.300)"}
    >
      <SidebarMenu
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        user={user}
        setAuth={setAuth}
        userInfo={userInfo}
      />
    </Flex>
  );
};

export default Sidebar;
