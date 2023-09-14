import { ChakraProvider, theme } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route as DefaultRoute,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import SearchPage from "./pages/SearchPage";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import { AuthContextProvider } from "./context/AuthContext";
import RequireAuth from "./util/RequireAuth";

export enum UserRoles {
  Admin = "Admin",
  Vendor = "Vendor",
}

export type AllowedRole = UserRoles.Admin | UserRoles.Vendor;

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Router>
          <Routes>
            <DefaultRoute path="/" element={<Homepage />} />
            <DefaultRoute path="/login" element={<Login />} />
            <DefaultRoute path="/register" element={<Register />} />
            <DefaultRoute
              path="/forgot-password"
              element={<ForgotPassword />}
            />
            <DefaultRoute path="/search/:query?" element={<SearchPage />} />
            <DefaultRoute path="/unauthorized" element={<Unauthorized />} />
            <DefaultRoute path="*" element={<NotFound />} />

            <DefaultRoute
              element={
                <RequireAuth
                  allowedRoles={
                    [UserRoles.Admin, UserRoles.Vendor] as AllowedRole[]
                  }
                />
              }
            >
              <DefaultRoute path="/dashboard" element={<Dashboard />} />
            </DefaultRoute>
          </Routes>
        </Router>
      </AuthContextProvider>
    </ChakraProvider>
  );
};

export default App;
