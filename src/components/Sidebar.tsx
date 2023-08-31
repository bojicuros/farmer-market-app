import {
  Flex,
  Divider,
  Avatar,
  Heading,
  Text,
  useColorMode,
  useMediaQuery,
  Box,
} from "@chakra-ui/react";
import NavItem from "../components/NavItem";
import { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { FaShoppingBasket, FaStore } from "react-icons/fa";
import { FiHome, FiSettings, FiMenu } from "react-icons/fi";
import { AiOutlineCheckCircle, AiFillDollarCircle } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { colorMode } = useColorMode();
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isSmallerScreen);
  const [collapsedForEffect, setCollapsedForEffect] =
    useState(isSidebarCollapsed);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const user = auth.user;

  useEffect(() => {
    if (isSmallerScreen !== collapsedForEffect) {
      setIsSidebarCollapsed(isSmallerScreen);
      setCollapsedForEffect(isSmallerScreen);
    }
  }, [isSmallerScreen, collapsedForEffect]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogoutPopup = () => {
    setShowLogoutPopup(!showLogoutPopup);
  };

  const handleLogout = () => {
    setAuth(null);
    navigate("/login");
  };

  return (
    <Flex
      pos="absolute"
      left="5"
      top="3"
      h={isSidebarCollapsed ? "10" : "95vh"}
      marginTop="1"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius="30px"
      w={isSmallerScreen ? (isSidebarCollapsed ? "15" : "90%") : "200px"}
      flexDir="column"
      justifyContent="space-between"
      bgGradient={"linear(to-tr, green.500, yellow.300)"}
    >
      {isSmallerScreen && (
        <Flex
          justify="flex-end"
          px={5}
          py={2}
          color={colorMode === "light" ? "gray.100" : "black"}
          mb="-10"
        >
          <FiMenu size={24} onClick={toggleSidebar} cursor="pointer" />
        </Flex>
      )}
      {!isSidebarCollapsed && (
        <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" as="nav">
          <NavItem icon={FiHome} title="Dashboard" active />
          <NavItem icon={FaStore} title="Markets" />
          <NavItem icon={FaShoppingBasket} title="Products" />
          <NavItem icon={BsPeopleFill} title="Vendors" />
          <NavItem icon={AiOutlineCheckCircle} title="Confirmations" />
          <NavItem icon={AiFillDollarCircle} title="Prices" />
          <NavItem icon={FiSettings} title="Settings" />
        </Flex>
      )}

      {!isSidebarCollapsed && (
        <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" ml="4">
          <Divider ml={"-4"} />
          <Flex
            mt={4}
            align="center"
            cursor="pointer"
            onClick={handleLogoutPopup}
          >
            {showLogoutPopup && (
              <Box
                position="absolute"
                top="90%"
                right={isSmallerScreen ? "200" : "-100"}
                width="90px"
                p="1rem"
                bg="green.500"
                borderRadius="10px"
                color={colorMode === "light" ? "white" : "black"}
                zIndex="1"
                opacity="70%"
                onClick={handleLogout}
              >
                Log out
              </Box>
            )}
            <Avatar size="sm" src="avatar-1.jpg" />
            {user && (
              <Flex flexDir="column" ml={4} display="flex">
                <Heading
                  as="h3"
                  size="sm"
                  color={colorMode === "light" ? "gray.100" : "black"}
                >
                  {user.name}
                </Heading>
                <Text color={colorMode === "light" ? "gray.200" : "black"}>
                  {user.roles.length === 2
                    ? user.roles[0] + "," + user.roles[1]
                    : user.roles[0]}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default Sidebar;
