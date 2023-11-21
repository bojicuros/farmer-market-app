import {
  Button,
  Flex,
  Icon,
  Td,
  Text,
  Tr,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { VendorProductInfo } from "./ProductInfoTable";
import { axiosPrivate } from "../../../config/general";
import { FaShoppingBasket } from "react-icons/fa";

type OnChildAction = () => void;

type VendorProductRowProps = VendorProductInfo & {
  onChildAction: OnChildAction;
};

const VendorProductRow = ({
  id,
  name,
  unit_of_measurement,
  market,
  market_id,
  user_id,
  onChildAction,
}: VendorProductRowProps) => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const { t } = useTranslation();
  const toast = useToast();

  const removeProduct = async () => {
    try {
      const response = await axiosPrivate.delete(
        `/products/delete-user-product?product_id=${id}&user_id=${user_id}&market_id=${market_id}`
      );
      if (response.status === 204) {
        toast({
          title: t("success"),
          description: t("productSuccessfullyRemoved"),
          status: "success",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
        onChildAction();
      } else
        toast({
          title: t("error"),
          description: t("productRemovingFailed"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (e) {
      toast({
        title: t("error"),
        description: t("productRemovingFailed"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
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
          ml={"-5"}
          onClick={removeProduct}
        >
          <Text
            fontSize="md"
            color="yellow.400"
            fontWeight="bold"
            cursor="pointer"
          >
            {t("removeFromYourProducts")}
          </Text>
        </Button>
      </Td>
    </Tr>
  );
};

export default VendorProductRow;
