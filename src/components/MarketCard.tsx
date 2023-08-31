import {
  Flex,
  Text,
  useBreakpointValue,
  useColorMode,
  Image,
} from "@chakra-ui/react";

type Props = {
  shadow?: string;
  isActive: boolean;
  toggleActive: () => void;
  name: string;
  img_url: string;
};

export const MarketCard = (props: Props) => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();

  return (
    <Flex
      rounded="xl"
      direction="column"
      ml={isSmallerScreen ? 0 : 6}
      bg={colorMode === "light" ? "gray.50" : "gray.700"}
      alignItems="center"
      border={props.isActive ? "1.5px solid" : "none"}
      borderColor={colorMode === "light" ? "green.600" : "green.200"}
      h="32vh"
      p={3}
      justify="center"
      cursor="pointer"
      _hover={{
        bgGradient: "linear(to-tr, green.500, yellow.300)",
      }}
      onClick={props.toggleActive}
    >
      <Image
        src={props.img_url}
        alt={props.name}
        h={"80%"}
        w={"90%"}
        mb={"-2"}
        borderRadius={"lg"}
        objectFit="cover"
      />
      <Text
        color={colorMode === "light" ? "gray.700" : "gray.50"}
        p="4"
        mb={"-6"}
        fontSize="xl"
        fontWeight="semibold"
      >
        {props.name}
      </Text>
    </Flex>
  );
};

export default MarketCard;
