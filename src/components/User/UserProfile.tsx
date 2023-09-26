import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";

const UserProfile = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const [isEditing, setIsEditing] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Flex p="6px 0px 42px 0px" justifyContent={"space-between"}>
          <Text fontSize="xl" fontWeight="bold">
            {"Profile information"}
          </Text>
          {!isSmallerScreen && (
            <Button onClick={toggleColorMode} mr={6}>
              Turn on {colorMode === "light" ? "Dark" : "Light"} mode
            </Button>
          )}
        </Flex>
        <Flex
          direction={isSmallerScreen ? "column" : "row"}
          justifyContent={"space-around"}
          gap={5}
        >
          <Flex
            direction={"column"}
            minW={"40%"}
            p={6}
            gap={6}
            borderWidth="1px"
            borderRadius={"xl"}
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              Basic information
            </Text>
            <FormControl>
              <FormLabel>First name:</FormLabel>
              {isEditing ? (
                <Input type="text" defaultValue={"Marko"} />
              ) : (
                <Text>{"Marko"}</Text>
              )}{" "}
            </FormControl>
            <FormControl>
              <FormLabel>Last name:</FormLabel>
              <FormLabel>Email</FormLabel>
              {isEditing ? (
                <Input type="text" defaultValue={"Markovic"} />
              ) : (
                <Text>{"Markovic"}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              {isEditing ? (
                <Input type="email" defaultValue={"marko@gmail.com"} />
              ) : (
                <Text>{"marko@gmail.com"}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              {isEditing ? (
                <Input type="number" defaultValue={"066225883"} />
              ) : (
                <Text>{"066225883"}</Text>
              )}
            </FormControl>
            {!isEditing ? (
              <Button
                bg={colorMode === "light" ? "green.400" : "green.500"}
                _hover={{
                  bg: colorMode === "light" ? "green.500" : "green.600",
                }}
                color={colorMode === "light" ? "white" : "gray.900"}
                onClick={handleEditClick}
              >
                Edit
              </Button>
            ) : (
              <Button
                bg={colorMode === "light" ? "green.400" : "green.500"}
                _hover={{
                  bg: colorMode === "light" ? "green.500" : "green.600",
                }}
                color={colorMode === "light" ? "white" : "gray.900"}
                onClick={handleSaveClick}
              >
                Save
              </Button>
            )}
          </Flex>
          <Flex
            direction={"column"}
            minW={"40%"}
            p={6}
            gap={6}
            borderWidth="1px"
            borderRadius={"xl"}
            alignSelf={isSmallerScreen ? "auto" : "flex-start"}
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              Change password
            </Text>

            <FormControl>
              <FormLabel>New password</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm new password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button
              bg={colorMode === "light" ? "green.400" : "green.500"}
              _hover={{
                bg: colorMode === "light" ? "green.500" : "green.600",
              }}
              color={colorMode === "light" ? "white" : "gray.900"}
              onClick={handleSaveClick}
            >
              Confirm
            </Button>
            {!doPasswordsMatch && (
              <Text mt="2" color="red">
                Passwords do not match
              </Text>
            )}
          </Flex>
          {isSmallerScreen && (
            <Button onClick={toggleColorMode} m={6} mb={10}>
              Turn on {colorMode === "light" ? "Dark" : "Light"} mode
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default UserProfile;
