import { useState } from "react";
import {
  Flex,
  Heading,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });

  const handleSearchToggle = () => {
    if (isSmallerScreen) {
      setSearchOpen((prev) => !prev);
    }
  };

  return (
    <Flex w="100%" alignItems="center">
      <Link to="/">
        <Heading
          ml="4"
          size="md"
          fontWeight="semibold"
          bgGradient="linear(to-l, green.400, green.600)"
          bgClip="text"
          cursor="pointer"
        >
          Market Price Check
        </Heading>
      </Link>

      <Spacer />

      {isSmallerScreen && (
        <InputGroup maxW="180px" display={isSearchOpen ? "block" : "none"}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Search markets" />
        </InputGroup>
      )}

      {!isSmallerScreen && (
        <InputGroup maxW="180px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Search markets" />
        </InputGroup>
      )}

      {isSmallerScreen && (
        <SearchIcon
          color="gray.300"
          cursor="pointer"
          onClick={handleSearchToggle}
          display={!isSearchOpen ? "block" : "none"}
        />
      )}

      <ColorModeSwitcher  />
    </Flex>
  );
};


export default Navbar