import {
  Badge,
  Button,
  Flex,
  Icon,
  Td,
  Text,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiStore } from "react-icons/bi";
import { MarketInfo } from "./MarketTable";
import { useTranslation } from "react-i18next";

const MarketTableRow = ({ name, address, is_open, date }: MarketInfo) => {
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
            as={BiStore}
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
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {address}
            </Text>
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
        >
          {is_open ? "Open" : "Closed"}
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {date}
        </Text>
      </Td>
      <Td>
        <Button p="0px" bg="transparent" variant="no-hover" cursor={"pointer"}>
          <Text
            fontSize="md"
            color="green.400"
            fontWeight="bold"
            cursor="pointer"
          >
            {t("edit")}
          </Text>
        </Button>
      </Td>
    </Tr>
  );
};

export default MarketTableRow;
