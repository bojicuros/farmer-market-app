import {
  Badge,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  Td,
  Text,
  Tr,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus, CiEdit } from "react-icons/ci";
import { UserRoles } from "../../../util/enums";
import { EmployeeInfo } from "./EmployeeTable";
import { useTranslation } from "react-i18next";
import axios, { API_URL } from "../../../config/general";
import { useState } from "react";
import VendorsMarketSelectForm from "./VendorsMarketSelectForm";

type OnChildAction = () => void;

type EmployeeTableRowProps = EmployeeInfo & {
  onChildAction: OnChildAction;
  handleOpenNotification: (success: boolean, message: string) => void;
};

const EmployeeTableRow = ({
  id,
  name,
  email,
  role,
  active,
  markets,
  onChildAction,
  handleOpenNotification,
}: EmployeeTableRowProps) => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedRoles, setEditedRoles] = useState(role);
  const [editedMarkets, setEditedMarkets] = useState(markets);

  const [selectingMarkets, setSelectingMarkets] = useState(false);

  const handleSaveClick = () => {
    if (isEditing) {
      if (
        editedName !== name ||
        editedEmail !== email ||
        !arraysAreEqual(role, editedRoles) ||
        !arraysAreEqual(markets, editedMarkets)
      )
        updateEmployeeInfo();
    }
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleClearClick = () => {
    setIsEditing(false);
    setEditedRoles(role);
    setEditedMarkets(markets);
  };

  const hideMarketSelectionForm = () => {
    setSelectingMarkets(false);
    setEditedMarkets(markets);
  };

  function arraysAreEqual(array1: string[], array2: string[]): boolean {
    if (array1.length !== array2.length) return false;

    for (let i = 0; i < array1.length; i++)
      if (array1[i] !== array2[i]) return false;

    return true;
  }

  const addRole = (roleName: string) => {
    if (!editedRoles.includes(roleName)) {
      setEditedRoles([...editedRoles, roleName]);
    }
  };

  const removeRole = (roleName: string) => {
    const updatedRoles = editedRoles.filter((role) => role !== roleName);
    setEditedRoles(updatedRoles);
  };

  const updateEmployeeInfo = async () => {
    const nameParts = editedName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    try {
      const response = await axios.post(`${API_URL}/users/update-user-info`, {
        id: id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        roles: editedRoles,
        markets: editedMarkets,
      });
      if (response.status === 200) {
        handleOpenNotification(true, t("employeeInfoUpdateSuccessful"));
        onChildAction();
      } else handleOpenNotification(false, t("employeeInfoUpdateFail"));
    } catch (e) {
      handleOpenNotification(false, t("employeeInfoUpdateFail"));
    }
  };

  const toggleEmployeeActiveStatus = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/users/toggle-active-status?id=${id}`
      );
      if (response.status === 200) {
        handleOpenNotification(true, t("employeeChangeStatusSuccessful"));
        onChildAction();
      } else handleOpenNotification(false, t("employeeChangeStatusFail"));
    } catch (e) {
      handleOpenNotification(false, t("employeeChangeStatusFail"));
    }
  };

  function RoleComponent() {
    return (
      <Flex direction="column" pl={2}>
        {editedRoles.length === 2 ? (
          <>
            <Flex dir="row" gap={5}>
              <Text fontSize="md" fontWeight="bold">
                {t("admin")}
              </Text>
              {isEditing ? (
                <CiCircleMinus
                  size={20}
                  color="red"
                  cursor={"pointer"}
                  onClick={() => removeRole(UserRoles.Admin)}
                />
              ) : null}
            </Flex>
            <Flex dir="row" gap={"2.5"}>
              <Text fontSize="sm" fontWeight="normal">
                {t("vendor")}
              </Text>
              {isEditing ? (
                <CiCircleMinus
                  size={20}
                  color="red"
                  cursor={"pointer"}
                  onClick={() => removeRole(UserRoles.Vendor)}
                />
              ) : null}
            </Flex>
          </>
        ) : editedRoles[0] === UserRoles.Admin ? (
          <Flex dir="row" gap={2}>
            <Text fontSize="md" fontWeight="bold">
              {t("admin")}
            </Text>
            {isEditing ? (
              <CiCirclePlus
                size={20}
                color="green"
                cursor={"pointer"}
                onClick={() => addRole(UserRoles.Vendor)}
              />
            ) : null}
          </Flex>
        ) : editedRoles[0] === UserRoles.Vendor ? (
          <Flex dir="row" gap={2}>
            <Text fontSize="md" fontWeight="bold">
              {t("vendor")}
            </Text>
            {isEditing ? (
              <CiCirclePlus
                size={20}
                color="green"
                cursor={"pointer"}
                onClick={() => addRole(UserRoles.Admin)}
              />
            ) : null}
          </Flex>
        ) : null}
      </Flex>
    );
  }

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Icon
            w={50}
            h={50}
            color={colorMode === "light" ? "green.500" : "green.400"}
            as={FaUserCircle}
          />
          <Flex direction="column" ml={5}>
            {isEditing ? (
              <>
                <Input
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  h={"5vh"}
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <Input
                  fontSize="sm"
                  color="gray.400"
                  h={"4vh"}
                  fontWeight="normal"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              </>
            ) : (
              <>
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  minWidth="100%"
                >
                  {name}
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {email}
                </Text>
              </>
            )}
          </Flex>
        </Flex>
      </Td>

      <Td>
        <RoleComponent />
      </Td>
      <Td pl={3}>
        <Badge
          bg={active ? "green.400" : "transparent"}
          color={active ? "white" : "gray.400"}
          fontSize="16px"
          p={active ? "3px 10px" : undefined}
          borderRadius="8px"
          cursor={"pointer"}
          onClick={toggleEmployeeActiveStatus}
        >
          {active ? "Active" : "Inactive"}
        </Badge>
      </Td>
      <Td>
        <HStack gap={2}>
          <VStack gap={2}>
            {editedMarkets.map((market, index) => (
              <Text
                key={index}
                fontSize="md"
                color={textColor}
                fontWeight="bold"
              >
                {market}
              </Text>
            ))}
          </VStack>

          {isEditing && markets.length > 0 ? (
            <CiEdit
              size={20}
              color="green"
              cursor={"pointer"}
              onClick={() => setSelectingMarkets(true)}
            />
          ) : null}
        </HStack>
        <VendorsMarketSelectForm
          markets={editedMarkets}
          isOpen={selectingMarkets}
          onClose={hideMarketSelectionForm}
          onSubmit={setEditedMarkets}
          handleOpenNotification={handleOpenNotification}
        ></VendorsMarketSelectForm>
      </Td>

      <Td>
        {isEditing ? (
          <Flex direction={"column"} ml={5}>
            <Button
              p="0px"
              bg="transparent"
              variant="no-hover"
              cursor="pointer"
              onClick={handleSaveClick}
            >
              <Text fontSize="md" color="green.400" fontWeight="bold">
                {t("save")}
              </Text>
            </Button>
            <Button
              p="0px"
              bg="transparent"
              variant="no-hover"
              cursor="pointer"
              onClick={handleClearClick}
            >
              <Text fontSize="md" color="yellow.400" fontWeight="bold">
                {t("clear")}
              </Text>
            </Button>
          </Flex>
        ) : (
          <Button
            ml={8}
            p="0px"
            bg="transparent"
            variant="no-hover"
            cursor="pointer"
            onClick={() => setIsEditing(true)}
          >
            <Text fontSize="md" color="green.400" fontWeight="bold">
              {t("edit")}
            </Text>
          </Button>
        )}
      </Td>
    </Tr>
  );
};

export default EmployeeTableRow;
