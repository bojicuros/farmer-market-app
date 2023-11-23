import {
  Box,
  Flex,
  HStack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import EmployeeTableRow from "./EmployeeTableRow";
import UnconfirmedEmployeeRow from "./UnconfirmedEmployeeRow";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { axiosPrivate } from "../../../config/general";

export type EmployeeInfo = {
  id: string;
  email: string;
  name: string;
  role: string[];
  markets: string[];
  active: boolean;
};

export type UnconfirmedEmployeeInfo = {
  id: string;
  email: string;
  name: string;
  date: string;
  role: string[];
};

const EmployeeTable = () => {
  const [employeesConfirmed, areEmployeesConfirmed] = useState(true);
  const textColor = useColorModeValue("gray.700", "white");
  const { t } = useTranslation();
  const captionsConfirmed = [
    t("employee"),
    t("function"),
    t("status"),
    t("markets"),
    "",
  ];
  const captionsUnconfirmed = [
    t("employee"),
    t("function"),
    t("singedIn"),
    t("markets"),
    "",
    "",
  ];
  const captions = employeesConfirmed ? captionsConfirmed : captionsUnconfirmed;
  const [refresh, setRefresh] = useState(false);
  const toast = useToast();

  const [employees, setEmployees] = useState<EmployeeInfo[] | null>(null);
  const [unconfirmedEmployees, setUnconfirmedEmployees] = useState<
    UnconfirmedEmployeeInfo[] | null
  >(null);

  const handleChildAction = () => {
    setTimeout(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, 1500);
  };

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(`/users/get-all-approved`);

      if (response.status === 200) setEmployees(response.data);
      else
        toast({
          title: t("error"),
          description: t("errorFetchingEmployees"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorFetchingEmployees"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  }, [t, toast]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees, refresh]);

  const fetchUnconfirmedEmployees = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(`/users/get-all-unapproved`);
      if (response.status === 200) setUnconfirmedEmployees(response.data);
      else
        toast({
          title: t("error"),
          description: t("errorFetchingUnconfirmedEmployees"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorFetchingUnconfirmedEmployees"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  }, [t, toast]);

  useEffect(() => {
    fetchUnconfirmedEmployees();
  }, [fetchUnconfirmedEmployees, refresh]);

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Box p="6px 0px 22px 0px">
          <HStack>
            <Text
              fontSize="xl"
              color={employeesConfirmed ? textColor : "gray.400"}
              fontWeight="bold"
              cursor={"pointer"}
              onClick={() => areEmployeesConfirmed(true)}
            >
              {t("employeesTable")}
            </Text>
            <Text
              fontSize="xl"
              color={employeesConfirmed ? "gray.400" : textColor}
              fontWeight="bold"
              ml={2}
              cursor={"pointer"}
              onClick={() => areEmployeesConfirmed(false)}
            >
              {t("unconfirmedRequests")}
            </Text>
          </HStack>
        </Box>
        <Box>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                {captions.map((caption: string, index: number) => {
                  return (
                    <Th
                      color="gray.400"
                      key={index}
                      ps={index === 0 ? "0px" : undefined}
                    >
                      {caption}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {employeesConfirmed
                ? employees?.map((row: EmployeeInfo) => {
                    return (
                      <EmployeeTableRow
                        key={row.id}
                        name={row.name}
                        id={row.id}
                        email={row.email}
                        role={row.role}
                        active={row.active}
                        markets={row.markets}
                        onChildAction={handleChildAction}
                      />
                    );
                  })
                : unconfirmedEmployees?.map((row: UnconfirmedEmployeeInfo) => {
                    return (
                      <UnconfirmedEmployeeRow
                        key={row.id}
                        id={row.id}
                        name={row.name}
                        email={row.email}
                        date={row.date}
                        role={row.role}
                        onChildAction={handleChildAction}
                      />
                    );
                  })}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Flex>
  );
};

export default EmployeeTable;
