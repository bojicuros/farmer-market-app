import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Td,
  Text,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BsCashCoin } from "react-icons/bs";
import { useState } from "react";
import axios, { API_URL } from "../../../config/general";
import PopupNotification from "../../Common/PopupNotification";
import { PriceInfo } from "./PriceTable";

type OnChildAction = () => void;

type PriceTableRowProps = PriceInfo & {
  user_id: string;
  onChildAction: OnChildAction;
};

const PriceTableRow = ({
  product_id,
  product_name,
  market_id,
  market_name,
  latest_price,
  user_id,
  onChildAction,
}: PriceTableRowProps) => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const { t } = useTranslation();

  const [editMode, setEditMode] = useState(false);
  const [price, setPrice] = useState(
    latest_price ? parseFloat(latest_price.toFixed(2)) : 0
  );

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleOpenNotification = (success: boolean, message: string) => {
    setIsSuccess(success);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const enableEditOrSave = () => {
    if (editMode) {
      addPriceValue();
    }
    setEditMode(!editMode);
  };

  const clearOrKeepPrice = () => {
    if (editMode) {
      setPrice(latest_price ? parseFloat(latest_price.toFixed(2)) : 0);
      setEditMode(!editMode);
    } else {
      addPriceValue();
    }
  };

  const addPriceValue = async () => {
    try {
      await axios.post(`${API_URL}/prices/add-product-price`, {
        user_id: user_id,
        market_id: market_id,
        product_id: product_id,
        price_value: price,
      });
      handleOpenNotification(true, t("priceAddingSuccess"));
      onChildAction();
    } catch (e) {
      handleOpenNotification(false, t("priceAddingFail"));
    }
  };

  const changePrice = (operation: string) => {
    if (editMode) {
      let updatedPrice = price;
      if (operation === "increase") {
        updatedPrice = parseFloat((price + 0.1).toFixed(2));
      } else if (operation === "decrease" && price >= 0.1) {
        updatedPrice = parseFloat((price - 0.1).toFixed(2));
      }
      setPrice(updatedPrice);
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
            as={BsCashCoin}
          />
          <Flex direction="column" ml={5}>
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {product_name}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <InputGroup>
          <InputLeftAddon
            cursor={"pointer"}
            onClick={() => changePrice("decrease")}
            bg={colorMode === "light" ? "green.200" : "green.700"}
            _hover={{ bg: colorMode === "light" ? "green.300" : "green.600" }}
          >
            -
          </InputLeftAddon>
          <Input
            type="number"
            value={price}
            fontSize="md"
            fontWeight="bold"
            textAlign={"center"}
            minW={"60px"}
            maxW={"90px"}
            disabled={!editMode}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <InputRightAddon
            cursor={"pointer"}
            onClick={() => changePrice("increase")}
            bg={colorMode === "light" ? "green.200" : "green.700"}
            _hover={{ bg: colorMode === "light" ? "green.300" : "green.600" }}
          >
            +
          </InputRightAddon>
        </InputGroup>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {market_name}
        </Text>
      </Td>
      <Td>
        <Button p="0px" bg="transparent" variant="no-hover" cursor={"pointer"}>
          <Text
            fontSize="md"
            color={editMode ? "green.400" : "yellow.400"}
            fontWeight="bold"
            cursor="pointer"
            onClick={enableEditOrSave}
          >
            {editMode ? t("save") : t("edit")}
          </Text>
        </Button>
      </Td>
      <Td>
        {(editMode === true || latest_price) && (
          <Button
            p="0px"
            bg="transparent"
            variant="no-hover"
            cursor={"pointer"}
          >
            <Text
              fontSize="md"
              color={editMode ? "red.400" : "green.400"}
              fontWeight="bold"
              cursor="pointer"
              onClick={clearOrKeepPrice}
            >
              {editMode ? t("clear") : t("keep")}
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

export default PriceTableRow;
