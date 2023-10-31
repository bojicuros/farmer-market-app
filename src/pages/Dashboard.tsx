import { useEffect, useState } from "react";
import Sidebar from "../components/Common/Sidebar";
import EmployeeTable from "../components/User/EmployeeTable";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { MenuItems } from "../util/enums";
import useAuth from "../hooks/useAuth";
import { AuthUser, UserInfo } from "../context/AuthContext";
import EmailConfirmation from "../components/Auth/EmailConfirmation";
import DashboardView from "../components/User/DashboardView";
import MarketTable from "../components/User/MarketTable";
import UserProfile from "../components/User/UserProfile";
import PriceAnalytic from "../components/User/PriceAnalytic";
import ProductInfoTable from "../components/User/ProductInfoTable";
import axios, { API_URL } from "../config/general";

const Dashboard = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const [activeItem, setActiveItem] = useState("");
  const { auth, setAuth } = useAuth();
  const user = auth?.user as AuthUser;
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

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
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [user?.userId]);

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
              return <ProductInfoTable editingPrices={false} user={user} />;
            case MenuItems.Prices:
              return <ProductInfoTable editingPrices={true} user={user} />;
            default:
              return null;
          }
        })()}
      </Box>
    </Flex>
  );
};

export default Dashboard;
