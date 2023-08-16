import { ChakraProvider, theme } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route as DefaultRoute,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";


const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <DefaultRoute path="/" element={<Homepage />} />
          <DefaultRoute path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
