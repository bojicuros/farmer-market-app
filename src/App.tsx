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

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <DefaultRoute path="/" element={<Homepage />} />
          <DefaultRoute path="/login" element={<Login />} />
          <DefaultRoute path="/register" element={<Register />} />
          <DefaultRoute path="/forgot-password" element={<ForgotPassword />} />
          <DefaultRoute path="/search" element={<SearchPage />} />
          <DefaultRoute path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
