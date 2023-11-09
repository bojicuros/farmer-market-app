import { useEffect, useState } from "react";
import Sidebar from "../components/Common/Sidebar";
import EmployeeTable from "../components/User/Employees/EmployeeTable";
import { Box, Flex, useBreakpointValue, useToast } from "@chakra-ui/react";
import { MenuItems } from "../util/enums";
import useAuth from "../hooks/useAuth";
import { AuthUser, UserInfo } from "../context/AuthContext";
import EmailConfirmation from "../components/Auth/EmailConfirmation";
import DashboardView from "../components/User/Dashboard/DashboardView";
import MarketTable from "../components/User/Market/MarketTable";
import UserProfile from "../components/User/Profile/UserProfile";
import PriceAnalytic from "../components/User/Analytic/PriceAnalytic";
import ProductInfoTable from "../components/User/Product/ProductInfoTable";
import axios, { API_URL } from "../config/general";
import PriceTable from "../components/User/Prices/PriceTable";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const [activeItem, setActiveItem] = useState("");
  const { auth, setAuth } = useAuth();
  const user = auth?.user as AuthUser;
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/get-by-id?id=${user?.userId}`
        );
        if (response.status === 200) {
          const fetchedInfo = response.data as UserInfo;
          setUserInfo(fetchedInfo);
        }
      } catch (error) {
        toast({
          title: t("error"),
          description: t("errorFetchingUserInfo"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });      }
    };

    fetchUserInfo();
  }, [user, t, toast]);

  return (
    <Flex
      minHeight="100vh"
      flexDirection={isSmallerScreen ? "column" : "row"}
      p={3}
    >
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        user={user}
        setAuth={setAuth}
        userInfo={userInfo}
      />
      <Box
        h={isSmallerScreen ? undefined : "95vh"}
        minH={isSmallerScreen ? "95vh" : undefined}
        w={"80vw"}
        ml={8}
        mt={isSmallerScreen ? 6 : 1}
        flexDirection={"column"}
        overflowY={isSmallerScreen ? "hidden" : "auto"}
      >
        {(() => {
          switch (activeItem) {
            case MenuItems.ManageEmployees:
              return <EmployeeTable areConfirmed={true} />;
            case MenuItems.Confirmations:
              return <EmployeeTable areConfirmed={false} />;
            case MenuItems.EmailConfirmation:
              return <EmailConfirmation user={user} userInfo={userInfo} />;
            case MenuItems.Dashboard:
              return <DashboardView />;
            case MenuItems.ManageMarkets:
              return <MarketTable />;
            case MenuItems.Settings:
              return <UserProfile user={user} />;
            case MenuItems.PriceAnalytic:
              return <PriceAnalytic />;
            case MenuItems.Products:
              return <ProductInfoTable areProductsVendors={false} user={user} />;
            case MenuItems.YourProducts:
              return <ProductInfoTable areProductsVendors={true} user={user} />;
            case MenuItems.Prices:
              return <PriceTable user={user} />;
            default:
              return null;
          }
        })()}
      </Box>
    </Flex>
  );
};

export default Dashboard;
