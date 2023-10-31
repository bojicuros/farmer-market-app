import { Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
  const { t } = useTranslation();

  return (
    <Flex w="100%" alignItems="center">
      <Link to="/login">
        <Heading
          ml="4"
          mt="2"
          size="md"
          fontWeight="semibold"
          bgGradient="linear(to-l, green.400, green.600)"
          bgClip="text"
          cursor="pointer"
        >
          {t("appName")}
        </Heading>
      </Link>
    </Flex>
  );
};

export default NavbarAdmin;
