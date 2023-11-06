import React from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  useColorMode,
} from "@chakra-ui/react";
import { IconBaseProps } from "react-icons";

type NavItemProps = {
  icon: React.ElementType<IconBaseProps>;
  title: string;
  active: boolean;
  onClick: () => void; 
};

export default function NavItem({
  icon,
  title,
  active,
  onClick,
}: NavItemProps) {
  const { colorMode } = useColorMode();

  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems="flex-start"
      h="5vh"
      onClick={onClick}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active ? "green.500" : undefined}
          opacity="80%"
          p={3}
          borderRadius={10}
          _hover={{ textDecoration: "none", backgroundColor: "green.500" }}
          w="100%"
        >
          <MenuButton
            w="100%"
            color={colorMode === "light" ? "white" : "black"}
          >
            <Flex>
              <Icon as={icon} fontSize="xl" />
              <Text ml={5} display="flex">
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
