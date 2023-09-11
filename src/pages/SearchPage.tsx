import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Search from "../components/Search";
import { Flex, VStack } from "@chakra-ui/react";

const SearchPage = () => {

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <VStack flex="1" p={5}>
        <Navbar />
        <Search />
      </VStack>
      <Footer />
    </Flex>
  );
};

export default SearchPage;