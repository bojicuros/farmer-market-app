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
import { FaUserCircle } from "react-icons/fa";
import { UnconfirmedEmployeeInfo } from "./EmployeeTable";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import axios, { API_URL } from "../../../config/general";

type OnChildAction = () => void;

type UnconfirmedEmployeeRowProps = UnconfirmedEmployeeInfo & {
  onChildAction: OnChildAction;
  handleOpenNotification: (success: boolean, message: string) => void;
};

const UnconfirmedEmployeeRow = ({
  id,
  name,
  email,
  date,
  markets,
  onChildAction,
  handleOpenNotification,
}: UnconfirmedEmployeeRowProps) => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const { t } = useTranslation();

  const handleAcceptClick = () => {
    confirmEmployee();
  };

  const handleRejectClick = () => {
    rejectEmployee();
  };

  const confirmEmployee = async () => {
    try {
      const response = await axios.put(`${API_URL}/users/approve?id=${id}`);
      if (response.status === 200) {
        handleOpenNotification(true, t("employeeApproveSuccessful"));
        onChildAction();
      } else handleOpenNotification(false, t("employeeApproveFail"));
    } catch (e) {
      handleOpenNotification(false, t("employeeApproveFail"));
    }
  };

  const rejectEmployee = async () => {
    try {
      const response = await axios.put(`${API_URL}/users/reject?id=${id}`);
      if (response.status === 200) {
        handleOpenNotification(true, t("employeeRejectSuccessful"));
        onChildAction();
      } else handleOpenNotification(false, t("employeeRejectFail"));
    } catch (e) {
      handleOpenNotification(false, t("employeeRejectFail"));
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
            as={FaUserCircle}
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
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        {markets.map((market, index) => (
          <Text key={index} fontSize="md" color={textColor} fontWeight="bold">
            {market}
          </Text>
        ))}
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {format(new Date(date), "dd-MM-yy")}
        </Text>
      </Td>
      <Td>
        <Button
          ml={10}
          p="0px"
          bg="transparent"
          variant="no-hover"
          cursor={"pointer"}
          onClick={handleAcceptClick}
        >
          <Text
            fontSize="md"
            color="green.400"
            fontWeight="bold"
            cursor="pointer"
          >
            {t("confirm")}
          </Text>
        </Button>
      </Td>
      <Td>
        <Button
          p="0px"
          bg="transparent"
          variant="no-hover"
          cursor={"pointer"}
          onClick={handleRejectClick}
        >
          <Text
            fontSize="md"
            color="red.400"
            fontWeight="bold"
            cursor="pointer"
          >
            {t("reject")}
          </Text>
        </Button>
      </Td>
    </Tr>
  );
};

export default UnconfirmedEmployeeRow;
