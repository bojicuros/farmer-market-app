import { useState } from "react";
import {
  Input,
  Button,
  Box,
  Text,
  useColorMode,
  Flex,
  Center,
} from "@chakra-ui/react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const { colorMode } = useColorMode();

  const handleSearch = () => {
    setSearchResults(["Result 1", "Result 2", "Result 3"]);
  };

  return (
    <Flex direction="column" mt="8" p={5}>
      <Box>
        <Input
          placeholder="Enter your search query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Center mt="5">
          <Button
            bgGradient="linear(to-tr, green.400, yellow.300)"
            color={colorMode === "light" ? "white" : "gray.700"}
            _hover={{ opacity: 0.8 }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Center>

        <Box mt="4">
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <Text key={index}>{result}</Text>
            ))
          ) : (
            <Text>No results found.</Text>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default Search;
