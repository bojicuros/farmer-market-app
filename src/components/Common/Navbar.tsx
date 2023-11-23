import { useState } from "react";
import {
  Flex,
  Heading,
  Spacer,
  Input,
  InputGroup,
  useBreakpointValue,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Link, useNavigate } from "react-router-dom";
import { LanguageSelector } from "../Localization/LanguageSelector";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearchToggle = () => {
    if (isSmallerScreen) {
      setSearchOpen((prev) => !prev);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery("");
    navigate(`/search/${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  const handleSearchIconClick = () => {
    handleSearch(searchQuery);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
          {t("appName")}
        </Heading>
      </Link>

      <Spacer />

      <InputGroup
        maxW="180px"
        display={isSmallerScreen ? (isSearchOpen ? "block" : "none") : "block"}
      >
        <Input
          type="text"
          placeholder={t("search")}
          onKeyDown={handleKeyDown}
          value={searchQuery}
          onChange={handleInputChange}
        />
        <InputRightElement>
          <SearchIcon
            color="gray.300"
            cursor={"pointer"}
            onClick={handleSearchIconClick}
          />
        </InputRightElement>
      </InputGroup>

      {isSmallerScreen && (
        <SearchIcon
          color="gray.300"
          cursor="pointer"
          onClick={handleSearchToggle}
          display={!isSearchOpen ? "block" : "none"}
        />
      )}

      <ColorModeSwitcher />
      <LanguageSelector />
    </Flex>
  );
};

export default Navbar;
