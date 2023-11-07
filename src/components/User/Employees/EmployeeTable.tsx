import {
  Box,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import EmployeeTableRow from "./EmployeeTableRow";
import UnconfirmedEmployeeRow from "./UnconfirmedEmployeeRow";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import axios, { API_URL } from "../../../config/general";
import PopupNotification from "../../Common/PopupNotification";

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
  markets: string[];
};

type EmployeeTableProps = {
  areConfirmed: boolean;
};

const EmployeeTable = ({ areConfirmed }: EmployeeTableProps) => {
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
    t("vendorInfo"),
    t("markets"),
    t("singedIn"),
    "",
    "",
  ];
  const captions = areConfirmed ? captionsConfirmed : captionsUnconfirmed;
  const [refresh, setRefresh] = useState(false);

  const [employees, setEmployees] = useState<EmployeeInfo[] | null>(null);
  const [unconfirmedEmployees, setUnconfirmedEmployees] = useState<
    UnconfirmedEmployeeInfo[] | null
  >(null);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleOpenNotification = (success: boolean, message: string) => {
    setIsSuccess(success);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const handleChildAction = () => {
    setTimeout(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, 1500);
  };

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/users/get-all-approved`);

      if (response.status === 200) setEmployees(response.data);
      else handleOpenNotification(false, "Error fetching employees");
    } catch (error) {
      handleOpenNotification(false, "Error fetching employees");
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees, refresh]);

  const fetchUnconfirmedEmployees = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/users/get-all-unapproved`);

      if (response.status === 200) setUnconfirmedEmployees(response.data);
      else
        handleOpenNotification(false, "Error fetching unconfirmed employees");
    } catch (error) {
      handleOpenNotification(false, "Error fetching unconfirmed employees");
    }
  }, []);

  useEffect(() => {
    fetchUnconfirmedEmployees();
  }, [fetchUnconfirmedEmployees, refresh]);

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Box p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {areConfirmed ? t("employeesTable") : t("unconfirmedRequests")}
          </Text>
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
            {areConfirmed
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
                        handleOpenNotification={handleOpenNotification}
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
                        markets={row.markets}
                        onChildAction={handleChildAction}
                        handleOpenNotification={handleOpenNotification}
                      />
                    );
                  })}
            </Tbody>
          </Table>
        </Box>
      </Box>
      <PopupNotification
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        isSuccess={isSuccess}
        message={notificationMessage}
      />
    </Flex>
  );
};

export default EmployeeTable;
