import {
  Button,
  Flex,
  Icon,
  Input,
  Select,
  Td,
  Text,
  Tr,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaShoppingBasket } from "react-icons/fa";
import { ProductInfo } from "./ProductInfoTable";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { useState } from "react";
import { axiosPrivate }  from "../../../config/general";
import { MeasureUnits } from "../../../util/enums";

type OnChildAction = () => void;

type ProductTableRowProps = ProductInfo & {
  onChildAction: OnChildAction;
};

const ProductTableRow = ({
  id,
  name,
  unit_of_measurement,
  created_at,
  onChildAction,
}: ProductTableRowProps) => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const { t } = useTranslation();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedUnitOfMeasurement, setEditedUnitOfMeasurement] =
    useState(unit_of_measurement);

  const editOrSaveProductInfo = () => {
    if (isEditing) {
      if (
        editedName !== name ||
        editedUnitOfMeasurement !== unit_of_measurement
      )
        updateProductInfo();
    }
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const clearOrDeleteProductInfo = () => {
    if (isEditing) setIsEditing(false);
    else {
      deleteProduct();
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await axiosPrivate.delete(
        `/products/delete-product?id=${id}`
      );
      if (response.status === 204) {
        toast({
          title: t("success"),
          description: t("productDeleteSuccess"),
          status: "success",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
        onChildAction();
      } else
        toast({
          title: t("error"),
          description: t("productDeleteFail"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (e) {
      toast({
        title: t("error"),
        description: t("productDeleteFail"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  };

  const updateProductInfo = async () => {
    try {
      const response = await axiosPrivate.put(`/products/update-product`, {
        id: id,
        name: editedName,
        unit_of_measurement: editedUnitOfMeasurement,
      });
      if (response.status === 200) {
        toast({
          title: t("success"),
          description: t("productUpdateSuccess"),
          status: "success",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
        onChildAction();
      } else
        toast({
          title: t("error"),
          description: t("productUpdateFail"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (e) {
      toast({
        title: t("error"),
        description: t("productUpdateFail"),
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
            {isEditing ? (
              <Input
                type="text"
                fontSize="md"
                color={textColor}
                fontWeight="bold"
                textAlign={"start"}
                maxW={"150px"}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                ml={"-3"}
              />
            ) : (
              <Text
                fontSize="md"
                color={textColor}
                fontWeight="bold"
                minWidth="100%"
              >
                {name}
              </Text>
            )}
          </Flex>
        </Flex>
      </Td>

      <Td>
        {isEditing ? (
          <Select
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            textAlign={"start"}
            maxW={"150px"}
            value={editedUnitOfMeasurement}
            onChange={(e) => setEditedUnitOfMeasurement(e.target.value)}
            ml={"-4"}
            mt={"-2"}
          >
            {Object.values(MeasureUnits).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </Select>
        ) : (
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {unit_of_measurement}
          </Text>
        )}
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {format(new Date(created_at), "dd-MM-yy")}
        </Text>
      </Td>
      <Td>
        <Button
          p="0px"
          bg="transparent"
          variant="no-hover"
          cursor={"pointer"}
          mb={"-2"}
          ml={"-5"}
        >
          <Text
            fontSize="md"
            color="green.400"
            fontWeight="bold"
            cursor="pointer"
            onClick={editOrSaveProductInfo}
          >
            {isEditing ? t("save") : t("edit")}
          </Text>
        </Button>
      </Td>
      <Td>
        <Button
          p="0px"
          bg="transparent"
          variant="no-hover"
          cursor={"pointer"}
          mb={"-2"}
          ml={"-5"}
        >
          <Text
            fontSize="md"
            color="yellow.400"
            fontWeight="bold"
            cursor="pointer"
            onClick={clearOrDeleteProductInfo}
          >
            {isEditing ? t("clear") : t("delete")}
          </Text>
        </Button>
      </Td>
    </Tr>
  );
};

export default ProductTableRow;
