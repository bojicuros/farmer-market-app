import {
  Badge,
  Button,
  Flex,
  Icon,
  Input,
  Td,
  Text,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiStore } from "react-icons/bi";
import { MarketInfo } from "./MarketTable";
import { useTranslation } from "react-i18next";
import axios, { API_URL } from "../../../config/general";
import PopupNotification from "../../Common/PopupNotification";
import { useState } from "react";
import { format } from "date-fns";

type OnChildAction = () => void;

type MarketTableRowProps = MarketInfo & {
  onChildAction: OnChildAction;
};

const MarketTableRow = ({
  id,
  name,
  address,
  is_open,
  created_at,
  onChildAction,
}: MarketTableRowProps) => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const [editedName, setEditedName] = useState(name);
  const [editedAddress, setEditedAddress] = useState(address);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleOpenNotification = (success: boolean, message: string) => {
    setIsSuccess(success);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const toggleMarketOpenStatus = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/markets/toggle-open-status?id=${id}`
      );
      if (response.status === 200) {
        handleOpenNotification(true, t("marketChangeStatusSuccessful"));
        onChildAction();
      } else handleOpenNotification(false, t("marketChangeStatusFail"));
    } catch (e) {
      handleOpenNotification(false, t("marketChangeStatusFail"));
    }
  };

  const handleEditClick = () => {
    setIsEditing((predIsEditing) => !predIsEditing);
  };

  const handleClearClick = () => {
    if (isEditing) setIsEditing(false);
  };

  const handleSaveClick = () => {
    if (isEditing) {
      if (editedName !== name || editedAddress !== address) updateMarket();
    }
    setIsEditing((predIsEditing) => !predIsEditing);
  };

  const updateMarket = async () => {
    try {
      const response = await axios.put(`${API_URL}/markets/update-by-id`, {
        id: id,
        name: editedName,
        address: editedAddress,
      });
      if (response.status === 200) {
        handleOpenNotification(true, t("marketUpdateSuccess"));
        onChildAction();
      } else handleOpenNotification(false, t("marketUpdateFail"));
    } catch (e) {
      handleOpenNotification(false, t("marketUpdateFail"));
    }
  };

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Icon
            w={50}
            h={50}
            color={colorMode === "light" ? "green.500" : "green.400"}
            as={BiStore}
          />
          <Flex direction="column" ml={5}>
            {isEditing ? (
              <>
                <Input
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  minWidth="100%"
                  h={"5vh"}
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <Input
                  fontSize="sm"
                  color="gray.400"
                  h={"4vh"}
                  fontWeight="normal"
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
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
                  {address}
                </Text>
              </>
            )}
          </Flex>
        </Flex>
      </Td>

      <Td pl={3}>
        <Badge
          bg={is_open ? "green.400" : "transparent"}
          color={is_open ? "white" : "gray.400"}
          fontSize="16px"
          p={is_open ? "3px 16px" : undefined}
          borderRadius="8px"
          cursor={"pointer"}
          onClick={toggleMarketOpenStatus}
        >
          {is_open ? "Open" : "Closed"}
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {format(new Date(created_at), "dd-MM-yy")}
        </Text>
      </Td>
      <Td>
        {isEditing ? (
          <Flex direction={"column"} mr={10}>
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
            onClick={handleEditClick}
          >
            <Text fontSize="md" color="green.400" fontWeight="bold">
              {t("edit")}
            </Text>
          </Button>
        )}
      </Td>
      <PopupNotification
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        isSuccess={isSuccess}
        message={notificationMessage}
      />
    </Tr>
  );
};

export default MarketTableRow;
