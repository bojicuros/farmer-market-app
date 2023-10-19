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
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const [isEditing, setIsEditing] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

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
              {t("basicInfo")}
            </Text>
            <FormControl>
              <FormLabel>{t("firstName")}:</FormLabel>
              {isEditing ? (
                <Input type="text" defaultValue={"Marko"} />
              ) : (
                <Text>{"Marko"}</Text>
              )}{" "}
            </FormControl>
            <FormControl>
              <FormLabel>{t("lastName")}:</FormLabel>
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
              <FormLabel>{t("phoneNum")}</FormLabel>
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
                {t("edit")}
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
                {t("save")}
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
              {t("changePassword")}
            </Text>

            <FormControl>
              <FormLabel>{t("newPassword")}</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl>
              <FormLabel>{t("confirmNewPassword")}</FormLabel>
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
              {t("confirm")}
            </Button>
            {!doPasswordsMatch && (
              <Text mt="2" color="red">
                {t("wrongConfPassword")}
              </Text>
            )}
          </Flex>
          {isSmallerScreen && (
            <Button onClick={toggleColorMode} m={6} mb={10}>
              {t("turnOn")}{colorMode === "light" ? "Dark" : "Light"}{t("mode")}
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default UserProfile;
