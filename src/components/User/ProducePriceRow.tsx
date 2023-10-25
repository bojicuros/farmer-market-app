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
import { ProductPriceInfo } from "./ProductInfoTable";
import { format } from "date-fns";

const ProductPriceRow = ({
  name,
  price_value,
  updated_at,
}: ProductPriceInfo) => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const { t } = useTranslation();

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
              {name}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <InputGroup>
          <InputLeftAddon
            cursor={"pointer"}
            onClick={() => console.log("+")}
            bg={colorMode === "light" ? "green.200" : "green.700"}
            _hover={{ bg: colorMode === "light" ? "green.300" : "green.600" }}
          >
            -{" "}
          </InputLeftAddon>
          <Input
            type="number"
            defaultValue={price_value}
            fontSize="md"
            fontWeight="bold"
            textAlign={"center"}
            minW={"60px"}
            maxW={"90px"}
          />
          <InputRightAddon
            cursor={"pointer"}
            onClick={() => console.log("-")}
            bg={colorMode === "light" ? "green.200" : "green.700"}
            _hover={{ bg: colorMode === "light" ? "green.300" : "green.600" }}
          >
            +
          </InputRightAddon>
        </InputGroup>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {format(new Date(updated_at), "dd-MM-yy")}
        </Text>
      </Td>
      <Td>
        <Button p="0px" bg="transparent" variant="no-hover" cursor={"pointer"}>
          <Text
            fontSize="md"
            color="yellow.400"
            fontWeight="bold"
            cursor="pointer"
          >
            {t("edit")}
          </Text>
        </Button>
      </Td>
      <Td>
        <Button p="0px" bg="transparent" variant="no-hover" cursor={"pointer"}>
          <Text
            fontSize="md"
            color="green.400"
            fontWeight="bold"
            cursor="pointer"
          >
            {t("keep")}
          </Text>
        </Button>
      </Td>
    </Tr>
  );
};

export default ProductPriceRow;
