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

type Props = {
  icon: React.ElementType<IconBaseProps>;
  title: string;
  active?: boolean;
};

export default function NavItem(props: Props) {
  const { icon, title, active } = props;
  const { colorMode } = useColorMode();

  return (
    <Flex mt={30} flexDir="column" w="100%" alignItems="flex-start" h="5vh">
      <Menu placement="right">
        <Link
          backgroundColor={active ? "green.500" : undefined}
          opacity="70%"
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
              <Icon
                as={icon}
                fontSize="xl"
              />
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
