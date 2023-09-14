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
import useAuth from "../../hooks/useAuth";
import NavItem from "../Nav/NavItem";
import { BiLogOut } from "react-icons/bi";
import { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoAnalyticsOutline } from "react-icons/io5";
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
  const [collapsedForEffect, setCollapsedForEffect] =
    useState(isSidebarCollapsed);

  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    if (user.roles.includes("Admin")) {
      setActiveItem("Dashboard");
    } else {
      setActiveItem("Prices");
    }
  }, [user.roles]);

  const handleNavItemClick = (itemTitle: string) => {
    setActiveItem(itemTitle);
    console.log(activeItem);
  };

  useEffect(() => {
    if (isSmallerScreen !== collapsedForEffect) {
      setIsSidebarCollapsed(isSmallerScreen);
      setCollapsedForEffect(isSmallerScreen);
    }
  }, [isSmallerScreen, collapsedForEffect, setIsSidebarCollapsed]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    setAuth(null);
    navigate("/login");
  };

  const commonMenuItems = (
    <>
      <NavItem
        icon={FiSettings}
        title="Settings"
        active={activeItem === "Settings"}
        onClick={() => handleNavItemClick("Settings")}
      />
    </>
  );

  const adminMenuItems = (
    <>
      <NavItem
        icon={FiHome}
        title="Dashboard"
        active={activeItem === "Dashboard"}
        onClick={() => handleNavItemClick("Dashboard")}
      />
      <NavItem
        icon={IoAnalyticsOutline}
        title="Price Analytic"
        active={activeItem === "Price Analytic"}
        onClick={() => handleNavItemClick("Price Analytic")}
      />
      <NavItem
        icon={AiOutlineCheckCircle}
        title="Confirmations"
        active={activeItem === "Confirmations"}
        onClick={() => handleNavItemClick("Confirmations")}
      />
      <NavItem
        icon={FaStore}
        title="Manage Markets"
        active={activeItem === "Manage Markets"}
        onClick={() => handleNavItemClick("Manage Markets")}
      />
      <NavItem
        icon={BsPeopleFill}
        title="Manage Employees"
        active={activeItem === "Manage Employees"}
        onClick={() => handleNavItemClick("Manage Employees")}
      />
    </>
  );

  const vendorMenuItems = (
    <>
      <NavItem
        icon={AiFillDollarCircle}
        title="Prices"
        active={activeItem === "Prices"}
        onClick={() => handleNavItemClick("Prices")}
      />
      <NavItem
        icon={FaShoppingBasket}
        title="Products"
        active={activeItem === "Products"}
        onClick={() => handleNavItemClick("Products")}
      />
    </>
  );

  const menuItems = (
    <>
      {!user.is_confirmed && (
        <NavItem
          icon={AiOutlineCheckCircle}
          title="Email confirmation"
          active={activeItem === "Email confirmation"}
          onClick={() => handleNavItemClick("Email confirmation")}
        />
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
      <Flex mt={4} align="center">
        <Avatar size="sm" src="avatar-1.jpg" />
        {user && (
          <Flex
            flexDir="column"
            ml={4}
            display="flex"
            w={isSmallerScreen ? "38vw" : "130px"}
          >
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
        <Box position={"absolute"} left={isSmallerScreen ? "60%" : "220px"}>
          <BiLogOut
            color={colorMode === "light" ? "white" : "black"}
            onClick={handleLogout}
            cursor="pointer"
            size={20}
          />
        </Box>
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
