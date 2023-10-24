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
  const { t, i18n } = useTranslation();

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "sr" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Flex p="6px 0px 42px 0px" justifyContent={"space-between"}>
          <Text fontSize="xl" fontWeight="bold">
            {t("profileInfo")}
          </Text>
          {!isSmallerScreen && (
            <Button
              bg={colorMode === "light" ? "green.400" : "green.500"}
              _hover={{
                bg: colorMode === "light" ? "green.500" : "green.600",
              }}
              color={colorMode === "light" ? "white" : "gray.900"}
              onClick={toggleColorMode}
              mr={6}
            >
              {t("turnOn")}
              {colorMode === "light" ? t("dark") : t("light")}
              {t("mode")}
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
              {isEditing ? (
                <Input type="text" defaultValue={"Markovic"} />
              ) : (
                <Text>{"Markovic"}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>{t("Email")}</FormLabel>
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
          <Flex direction={"column"} minW={"35%"} gap={10}>
            <Flex
              direction={"column"}
              minW={"100%"}
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
            <Flex
              direction={"column"}
              minW={"100%"}
              p={6}
              gap={6}
              borderWidth="1px"
              borderRadius={"xl"}
              alignSelf={isSmallerScreen ? "auto" : "flex-start"}
            >
              <Text fontSize={"md"} fontWeight={"semibold"}>
                {t("language")}
              </Text>

              <FormControl>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    w={"48%"}
                    bg={colorMode === "light" ? "green.400" : "green.500"}
                    _hover={{
                      bg: colorMode === "light" ? "green.500" : "green.600",
                    }}
                    color={colorMode === "light" ? "white" : "gray.900"}
                    isDisabled={i18n.language === "en"}
                    onClick={toggleLanguage}
                  >
                    {t("english")}
                  </Button>
                  <Button
                    w={"48%"}
                    bg={colorMode === "light" ? "green.400" : "green.500"}
                    _hover={{
                      bg: colorMode === "light" ? "green.500" : "green.600",
                    }}
                    color={colorMode === "light" ? "white" : "gray.900"}
                    isDisabled={i18n.language === "sr"}
                    onClick={toggleLanguage}
                  >
                    {t("serbian")}
                  </Button>
                </Box>
              </FormControl>
            </Flex>
          </Flex>
          {isSmallerScreen && (
            <Button
              bg={colorMode === "light" ? "green.400" : "green.500"}
              _hover={{
                bg: colorMode === "light" ? "green.500" : "green.600",
              }}
              color={colorMode === "light" ? "white" : "gray.900"}
              onClick={toggleColorMode}
              m={6}
              mb={10}
            >
              {t("turnOn")}
              {colorMode === "light" ? t("dark") : t("light")}
              {t("mode")}
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default UserProfile;
