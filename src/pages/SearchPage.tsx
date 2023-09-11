import React from "react";
import { Flex, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Search from "../components/Search";

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
