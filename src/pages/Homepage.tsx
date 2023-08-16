import { VStack, Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ProductTable } from "../components/ProductTable";
import { Markets } from "../components/Markets";

const Homepage = () => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <VStack flex="1" p={5}>
        <Navbar />
        <Header />
        <Markets />
        <ProductTable />
      </VStack>
      <Footer />
    </Flex>
  );
};

export default Homepage;
