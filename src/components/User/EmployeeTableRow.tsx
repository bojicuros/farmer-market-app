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
import { FaUserCircle } from "react-icons/fa";

type EmployeeInfo = {
  email: string;
  name: string;
  role: string;
  active: boolean;
  date: string;
};

const EmployeeTableRow = (props: EmployeeInfo) => {
  const { name, email, role, active, date } = props;
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  function RoleComponent() {
    const rolesArray = role.split(", ");

    return (
      <Flex direction="column" pl={2}>
        {rolesArray.length === 2 ? (
          <>
            <Text fontSize="md" fontWeight="bold">
              Admin
            </Text>
            <Text fontSize="sm" fontWeight="normal">
              Vendor
            </Text>
          </>
        ) : rolesArray[0] === "Admin" ? (
          <Text fontSize="md" fontWeight="bold">
            Admin
          </Text>
        ) : rolesArray[0] === "Vendor" ? (
          <Text fontSize="md" fontWeight="bold">
            Vendor
          </Text>
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
      <Td pl={3}>
        <Badge
          bg={active ? "green.400" : bgStatus}
          color={active ? "white" : colorStatus}
          fontSize="16px"
          p={active ? "3px 10px" : undefined}
          borderRadius="8px"
        >
          {active ? "Active" : "Inactive"}
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
            Edit
          </Text>
        </Button>
      </Td>
    </Tr>
  );
};

export default EmployeeTableRow;