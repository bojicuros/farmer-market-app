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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthUser } from "../../../context/AuthContext";
import axios, { API_URL } from "../../../config/general";

type UserProfileProps = {
  user: AuthUser;
};

type UserInfo = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
  confirmed: boolean;
  is_active: boolean;
};

const UserProfile = ({ user }: UserProfileProps) => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const { t, i18n } = useTranslation();
  const toast = useToast();

  const inputFirstNameRef = useRef<HTMLInputElement | null>(null);
  const inputLastNameRef = useRef<HTMLInputElement | null>(null);
  const inputEmailRef = useRef<HTMLInputElement | null>(null);
  const inputPhoneNumberRef = useRef<HTMLInputElement | null>(null);

  const inputPasswordRef = useRef<HTMLInputElement | null>(null);
  const inputPasswordConfirmRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await axios.get(
          `${API_URL}/users/get-by-id?id=${user.userId}`
        );

        setUserInfo(response.data);
      } catch (error) {
        toast({
          title: t("error"),
          description: t("errorFetchingUserInfo"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
      }
    }

    fetchUserInfo();
  }, [user, t, toast]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    let hasChanged = false;

    if (userInfo) {
      if (
        inputFirstNameRef.current &&
        userInfo.first_name !== inputFirstNameRef.current.value
      ) {
        hasChanged = true;
      }
      if (
        inputLastNameRef.current &&
        userInfo.last_name !== inputLastNameRef.current.value
      ) {
        hasChanged = true;
      }
      if (
        inputEmailRef.current &&
        userInfo.email !== inputEmailRef.current.value
      ) {
        hasChanged = true;
      }
      if (
        inputPhoneNumberRef.current &&
        userInfo.phone_number !== inputPhoneNumberRef.current.value
      ) {
        hasChanged = true;
      }
    }

    if (hasChanged) {
      updateUserInfo();
    }

    setIsEditing(false);

    async function updateUserInfo() {
      try {
        const inputInfo = {
          first_name: inputFirstNameRef.current?.value,
          last_name: inputLastNameRef.current?.value,
          email: inputEmailRef.current?.value,
          phone_number: inputPhoneNumberRef.current?.value,
        };
        const response = await axios.put(`${API_URL}/users/update`, {
          id: user.userId,
          ...inputInfo,
        });
        if (response.status === 200) {
          setUserInfo(inputInfo as UserInfo);
          toast({
            title: t("success"),
            description: t("successfulUpdateInfo"),
            status: "success",
            duration: 1500,
            position: "top",
            isClosable: true,
          });
        } else
          toast({
            title: t("error"),
            description: t("errorUpdateInfo"),
            status: "error",
            duration: 1500,
            position: "top",
            isClosable: true,
          });
      } catch (error) {
        toast({
          title: t("error"),
          description: t("errorUpdateInfo"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
      }
    }
  };

  async function updateUserPassword() {
    try {
      const response = await axios.put(`${API_URL}/users/update`, {
        id: user.userId,
        password: inputPasswordRef.current?.value,
      });
      if (response.status === 200) {
        toast({
          title: t("success"),
          description: t("successfulPass"),
          status: "success",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
      } else
        toast({
          title: t("error"),
          description: t("errorUpdatePass"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
      if (inputPasswordRef.current) {
        inputPasswordRef.current.value = "";
      }
      if (inputPasswordConfirmRef.current) {
        inputPasswordConfirmRef.current.value = "";
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorUpdatePass"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  }

  const handleChangeClick = () => {
    if (
      inputPasswordRef.current === null ||
      inputPasswordConfirmRef.current === null ||
      inputPasswordRef.current.value.length < 8 ||
      inputPasswordConfirmRef.current.value.length < 8
    ) {
      toast({
        title: t("error"),
        description: t("shortPass"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    } else if (
      inputPasswordRef.current?.value === inputPasswordConfirmRef.current?.value
    ) {
      updateUserPassword();
    } else
      toast({
        title: t("error"),
        description: t("wrongPass"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
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
                <Input
                  type="text"
                  defaultValue={userInfo?.first_name}
                  ref={inputFirstNameRef}
                />
              ) : (
                <Text>{userInfo?.first_name}</Text>
              )}{" "}
            </FormControl>
            <FormControl>
              <FormLabel>{t("lastName")}:</FormLabel>
              {isEditing ? (
                <Input
                  type="text"
                  defaultValue={userInfo?.last_name}
                  ref={inputLastNameRef}
                />
              ) : (
                <Text>{userInfo?.last_name}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>{t("Email")}</FormLabel>
              {isEditing ? (
                <Input
                  type="email"
                  defaultValue={userInfo?.email}
                  ref={inputEmailRef}
                />
              ) : (
                <Text>{userInfo?.email}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>{t("phoneNum")}</FormLabel>
              {isEditing ? (
                <Input
                  type="number"
                  defaultValue={userInfo?.phone_number}
                  ref={inputPhoneNumberRef}
                />
              ) : (
                <Text>{userInfo?.phone_number}</Text>
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
                <Input type="password" ref={inputPasswordRef} />
              </FormControl>
              <FormControl>
                <FormLabel>{t("confirmNewPassword")}</FormLabel>
                <Input type="password" ref={inputPasswordConfirmRef} />
              </FormControl>
              <Button
                bg={colorMode === "light" ? "green.400" : "green.500"}
                _hover={{
                  bg: colorMode === "light" ? "green.500" : "green.600",
                }}
                color={colorMode === "light" ? "white" : "gray.900"}
                onClick={handleChangeClick}
              >
                {t("confirm")}
              </Button>
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
