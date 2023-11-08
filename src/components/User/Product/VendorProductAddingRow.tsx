import {
  Button,
  Flex,
  Icon,
  Td,
  Text,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { VendorProductInfo } from "./ProductInfoTable";
import { useState } from "react";
import axios, { API_URL } from "../../../config/general";
import PopupNotification from "../../Common/PopupNotification";
import { FaShoppingBasket } from "react-icons/fa";

type OnChildAction = () => void;

type VendorProductAddingRowProps = VendorProductInfo & {
  onChildAction: OnChildAction;
};

const VendorProductAddingRow = ({
  id,
  name,
  unit_of_measurement,
  market,
  market_id,
  user_id,
  onChildAction,
}: VendorProductAddingRowProps) => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const { t } = useTranslation();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleOpenNotification = (success: boolean, message: string) => {
    setIsSuccess(success);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const addProduct = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/products/add-user-product`, {
          product_id: id,
          user_id: user_id,
          market_id: market_id,
        }
      );
      if (response.status === 201) {
        handleOpenNotification(true, t("productSuccessfullyAdded"));
        onChildAction();
      } else handleOpenNotification(false, t("productAddingFailed"));
    } catch (e) {
      handleOpenNotification(false, t("productAddingFailed"));
    }
  };

  return (
    <Tr>
      <Td minW={{ sm: "220px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Icon
            w={50}
            h={50}
            color={colorMode === "light" ? "green.500" : "green.400"}
            as={FaShoppingBasket}
          />
          <Flex direction="column" ml={5}>
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {unit_of_measurement}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {market}
        </Text>
      </Td>
      <Td>
        <Button
          p="0px"
          bg="transparent"
          variant="no-hover"
          cursor={"pointer"}
          mb={"2"}
          onClick={addProduct}
        >
          <Text
            fontSize="md"
            color="yellow.400"
            fontWeight="bold"
            cursor="pointer"
          >
            {t("addToYourProducts")}
          </Text>
        </Button>
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

export default VendorProductAddingRow;
