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
import NavItem from "../Nav/NavItem";
import { BiLogOut } from "react-icons/bi";
import { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaShoppingBasket, FaStore } from "react-icons/fa";
import { FiHome, FiSettings, FiMenu } from "react-icons/fi";
import { AiOutlineCheckCircle, AiFillDollarCircle } from "react-icons/ai";
import { MenuItems, UserRoles } from "../../util/enums";
import { Auth, AuthUser } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

type SidebarMenuProps = {
  activeItem: string;
  setActiveItem: (arg0: string) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (arg0: boolean) => void;
  user: AuthUser;
  setAuth: (auth: Auth | null) => void;
};

const SidebarMenu = ({
  activeItem,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  setActiveItem,
  user,
  setAuth,
}: SidebarMenuProps) => {
  const navigate = useNavigate();

  const { colorMode } = useColorMode();
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const [collapsedForEffect, setCollapsedForEffect] =
    useState(isSidebarCollapsed);

  const { t } = useTranslation();

  useEffect(() => {
    if (user.roles.includes(UserRoles.Admin)) {
      setActiveItem(MenuItems.Dashboard);
    } else {
      if (!user.is_confirmed) setActiveItem(MenuItems.EmailConfirmation);
      else setActiveItem(MenuItems.Prices);
    }
  }, [user.roles, user.is_confirmed, setActiveItem]);

  const handleNavItemClick = (itemTitle: string) => {
    setActiveItem(itemTitle);
    if (isSmallerScreen && !isSidebarCollapsed) toggleSidebar();
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

  const commonMenuOptions = (
    <>
      <NavItem
        icon={FiSettings}
        title={t("settings")}
        active={activeItem === MenuItems.Settings}
        onClick={() => handleNavItemClick(MenuItems.Settings)}
      />
    </>
  );

  const adminMenuOptions = (
    <>
      <NavItem
        icon={FiHome}
        title={t("dashboard")}
        active={activeItem === MenuItems.Dashboard}
        onClick={() => handleNavItemClick(MenuItems.Dashboard)}
      />
      <NavItem
        icon={IoAnalyticsOutline}
        title={t("priceAnalytic")}
        active={activeItem === MenuItems.PriceAnalytic}
        onClick={() => handleNavItemClick(MenuItems.PriceAnalytic)}
      />
      <NavItem
        icon={AiOutlineCheckCircle}
        title={t("confirmations")}
        active={activeItem === MenuItems.Confirmations}
        onClick={() => handleNavItemClick(MenuItems.Confirmations)}
      />
      <NavItem
        icon={FaStore}
        title={t("manageMarkets")}
        active={activeItem === MenuItems.ManageMarkets}
        onClick={() => handleNavItemClick(MenuItems.ManageMarkets)}
      />
      <NavItem
        icon={BsPeopleFill}
        title={t("manageEmployees")}
        active={activeItem === MenuItems.ManageEmployees}
        onClick={() => handleNavItemClick(MenuItems.ManageEmployees)}
      />
    </>
  );

  const vendorMenuOptions = (
    <>
      <NavItem
        icon={AiFillDollarCircle}
        title={t("prices")}
        active={activeItem === "Prices"}
        onClick={() => handleNavItemClick("Prices")}
      />
      <NavItem
        icon={FaShoppingBasket}
        title={t("products")}
        active={activeItem === "Products"}
        onClick={() => handleNavItemClick("Products")}
      />
    </>
  );

  const MenuOptions = (
    <>
      {!user.is_confirmed && (
        <NavItem
          icon={AiOutlineCheckCircle}
          title={t("emailConfirmation")}
          active={activeItem === "Email confirmation"}
          onClick={() => handleNavItemClick("Email confirmation")}
        />
      )}
      {user.is_approved && user.is_confirmed && (
        <>
          {user.roles.includes(UserRoles.Admin) &&
            user.roles.includes(UserRoles.Vendor) && (
              <>
                {adminMenuOptions}
                {vendorMenuOptions}
                {commonMenuOptions}
              </>
            )}
          {user.roles.includes(UserRoles.Admin) &&
            !user.roles.includes(UserRoles.Vendor) && (
              <>
                {adminMenuOptions}
                {commonMenuOptions}
              </>
            )}
          {user.roles.includes(UserRoles.Vendor) &&
            !user.roles.includes(UserRoles.Admin) && (
              <>
                {vendorMenuOptions}
                {commonMenuOptions}
              </>
            )}
        </>
      )}
    </>
  );

  const sidebarMenu = (
    <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" as="nav">
      {MenuOptions}
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
                ? t("admin") + ", " + t("vendor")
                : user.roles[0] === "Admin"
                ? t("admin")
                : t("vendor")}
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
