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
import useAuth from "../hooks/useAuth";
import NavItem from "../components/NavItem";
import { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaShoppingBasket, FaStore } from "react-icons/fa";
import { FiHome, FiSettings, FiMenu } from "react-icons/fi";
import { AiOutlineCheckCircle, AiFillDollarCircle } from "react-icons/ai";

type SidebarMenuProps = {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (arg0: boolean) => void;
};

const SidebarMenu = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
}: SidebarMenuProps) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const user = auth.user;

  const { colorMode } = useColorMode();
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [collapsedForEffect, setCollapsedForEffect] =
    useState(isSidebarCollapsed);

  useEffect(() => {
    if (isSmallerScreen !== collapsedForEffect) {
      setIsSidebarCollapsed(isSmallerScreen);
      setCollapsedForEffect(isSmallerScreen);
    }
  }, [isSmallerScreen, collapsedForEffect, setIsSidebarCollapsed]);

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

  const commonMenuItems = (
    <>
      <NavItem icon={FiSettings} title="Settings" />
    </>
  );

  const adminMenuItems = (
    <>
      <NavItem icon={FiHome} title="Dashboard" active />
      <NavItem icon={FaStore} title="Markets" />
      <NavItem icon={BsPeopleFill} title="Vendors" />
      <NavItem icon={AiOutlineCheckCircle} title="Confirmations" />
    </>
  );

  const vendorMenuItems = (
    <>
      <NavItem icon={AiFillDollarCircle} title="Prices" />
      <NavItem icon={FaShoppingBasket} title="Products" />
    </>
  );

  const menuItems = (
    <>
      {!user.is_confirmed && (
        <NavItem icon={AiOutlineCheckCircle} title="Email confirm" />
      )}
      {user.is_approved && user.is_confirmed && (
        <>
          {user.roles.includes("Admin") && user.roles.includes("Vendor") && (
            <>
              {adminMenuItems}
              {vendorMenuItems}
              {commonMenuItems}
            </>
          )}
          {user.roles.includes("Admin") && !user.roles.includes("Vendor") && (
            <>
              {adminMenuItems}
              {commonMenuItems}
            </>
          )}
          {user.roles.includes("Vendor") && !user.roles.includes("Admin") && (
            <>
              {vendorMenuItems}
              {commonMenuItems}
            </>
          )}
        </>
      )}
    </>
  );

  const sidebarMenu = (
    <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" as="nav">
      {menuItems}
    </Flex>
  );

  const userPart = (
    <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" ml="4">
      <Divider ml={"-4"} />
      <Flex mt={4} align="center" cursor="pointer" onClick={handleLogoutPopup}>
        {showLogoutPopup && (
          <Box
            position="absolute"
            bottom="2"
            right={isSmallerScreen ? "5%" : "-100"}
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
                ? user.roles[0] + ", " + user.roles[1]
                : user.roles[0]}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );

  return (
    <>
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
      {!isSidebarCollapsed && sidebarMenu}
      {!isSidebarCollapsed && userPart}
    </>
  );
};

export default SidebarMenu;
