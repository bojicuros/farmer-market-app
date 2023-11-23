import {
  Button,
  Flex,
  HStack,
  Icon,
  Td,
  Text,
  Tr,
  VStack,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { UnconfirmedEmployeeInfo } from "./EmployeeTable";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { axiosPrivate }  from "../../../config/general";
import { CiEdit } from "react-icons/ci";
import VendorsMarketSelectForm from "./VendorsMarketSelectForm";
import { useState } from "react";
import { UserRoles } from "../../../util/enums";

type OnChildAction = () => void;

type UnconfirmedEmployeeRowProps = UnconfirmedEmployeeInfo & {
  onChildAction: OnChildAction;
};

const UnconfirmedEmployeeRow = ({
  id,
  name,
  email,
  date,
  role,
  onChildAction,
}: UnconfirmedEmployeeRowProps) => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const { t } = useTranslation();
  const toast = useToast();

  const [editedMarkets, setEditedMarkets] = useState<string[]>([]);
  const [selectingMarkets, setSelectingMarkets] = useState(false);
  const isVendor = role.includes(UserRoles.Vendor);

  const hideMarketSelectionForm = () => {
    setSelectingMarkets(false);
    setEditedMarkets([]);
  };

  const handleAcceptClick = () => {
    if (!isVendor) return confirmEmployee();

    if (editedMarkets.length === 0)
      toast({
        title: t("error"),
        description: t("assignMarketFirst"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    else {
      addVendorsMarkets();
      confirmEmployee();
    }
  };

  const handleRejectClick = () => {
    rejectEmployee();
  };

  const confirmEmployee = async () => {
    try {
      const response = await axiosPrivate.put(`/users/approve?id=${id}`);
      if (response.status === 200) {
        toast({
          title: t("success"),
          description: t("employeeApproveSuccessful"),
          status: "success",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
        onChildAction();
      } else
        toast({
          title: t("error"),
          description: t("employeeApproveFail"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (e) {
      toast({
        title: t("error"),
        description: t("employeeApproveFail"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  };

  const rejectEmployee = async () => {
    try {
      const response = await axiosPrivate.put(`/users/reject?id=${id}`);
      if (response.status === 200) {
        toast({
          title: t("success"),
          description: t("employeeRejectSuccessful"),
          status: "success",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
        onChildAction();
      } else
        toast({
          title: t("error"),
          description: t("employeeRejectFail"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (e) {
      toast({
        title: t("error"),
        description: t("employeeRejectFail"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  };

  const addVendorsMarkets = async () => {
    try {
      const response = await axiosPrivate.post(
        `/users/add-markets-to-user`,
        {
          id: id,
          marketNames: editedMarkets,
        }
      );
      if (response.status !== 200) {
        return toast({
          title: t("error"),
          description: t("errorAddingMarketsToUser"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
      }
      onChildAction();
    } catch (e) {
      toast({
        title: t("error"),
        description: t("errorAddingMarketsToUser"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  };

  function RoleComponent() {
    return (
      <Flex direction="column" pl={2}>
        {role.length === 2 ? (
          <>
            <Flex dir="row" gap={5}>
              <Text fontSize="md" fontWeight="bold">
                {t("admin")}
              </Text>
            </Flex>
            <Flex dir="row" gap={"2.5"}>
              <Text fontSize="sm" fontWeight="normal">
                {t("vendor")}
              </Text>
            </Flex>
          </>
        ) : role[0] === UserRoles.Admin ? (
          <Flex dir="row" gap={2}>
            <Text fontSize="md" fontWeight="bold">
              {t("admin")}
            </Text>
          </Flex>
        ) : role[0] === UserRoles.Vendor ? (
          <Flex dir="row" gap={2}>
            <Text fontSize="md" fontWeight="bold">
              {t("vendor")}
            </Text>
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
        <RoleComponent />
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {format(new Date(date), "dd-MM-yy")}
        </Text>
      </Td>

      <Td>
        {isVendor && (
          <>
            <HStack gap={2} ml={editedMarkets.length > 0 ? undefined : "8"}>
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

              <CiEdit
                size={20}
                color="green"
                cursor={"pointer"}
                onClick={() =>
                  setSelectingMarkets(
                    (prevSelectingMarkets) => !prevSelectingMarkets
                  )
                }
              />
            </HStack>
            <VendorsMarketSelectForm
              markets={editedMarkets}
              isOpen={selectingMarkets}
              onClose={hideMarketSelectionForm}
              onSubmit={setEditedMarkets}
            ></VendorsMarketSelectForm>
          </>
        )}
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
      <Td width="20px">
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
