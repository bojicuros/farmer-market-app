import { useState } from "react";
import Sidebar from "../components/Common/Sidebar";
import EmployeeTable from "../components/User/EmployeeTable";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { MenuItems } from "../util/enums";
import useAuth from "../hooks/useAuth";
import { AuthUser } from "../context/AuthContext";
import EmailConfirmation from "../components/Auth/EmailConfirmation";
import DashboardView from "../components/User/DashboardView";
import MarketTable from "../components/User/MarketTable";
import UserProfile from "../components/User/UserProfile";
import PriceAnalytic from "../components/User/PriceAnalytic";
import ProductInfoTable from "../components/User/ProductInfoTable";

const Dashboard = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const [activeItem, setActiveItem] = useState("");
  const { auth, setAuth } = useAuth();
  const user = auth?.user as AuthUser;

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
              return <EmailConfirmation user={user} />;
            case MenuItems.Dashboard:
              return <DashboardView />;
            case MenuItems.ManageMarkets:
              return <MarketTable />;
            case MenuItems.Settings:
              return <UserProfile />;
            case MenuItems.PriceAnalytic:
              return <PriceAnalytic />;
            case MenuItems.Products:
              return <ProductInfoTable />;
            default:
              return null;
          }
        })()}
      </Box>
    </Flex>
  );
};

export default Dashboard;
