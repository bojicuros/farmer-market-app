import {
  TableContainer,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  useColorMode,
  useBreakpointValue,
  Box,
  Text,
  Button,
  ButtonGroup,
  useToast,
  Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios  from "../../config/general";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

type Product = {
  id: string;
  name: string;
  price: number;
  measureUnit: string;
  vendor: string;
};

type ProductPrice = {
  id: string;
  price_date: string;
  price_value: number;
  vendors_name: string;
  product: {
    name: string;
    unit_of_measurement: string;
  };
};

interface ProductTableProps {
  activeMarket: string | null;
}

export const ProductTable = ({ activeMarket }: ProductTableProps) => {
  const { colorMode } = useColorMode();
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const isMiddleScreen = useBreakpointValue({
    base: false,
    md: true,
    lg: false,
  });
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [currentMarket, setCurrentMarket] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const [date, setDate] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { t } = useTranslation();
  const toast = useToast();

  const requestSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    async function fetchTodaysPrices() {
      if (!activeMarket) return;

      if (activeMarket !== currentMarket) setCurrentPage(1);

      const dayOfWeek = format(selectedDate, "eeee");
      const translatedDayOfWeek = t(dayOfWeek);
      const formattedDate = format(selectedDate, "dd. MMM yyyy");
      setDate(`${translatedDayOfWeek} ${formattedDate}`);

      try {
        const response = await axios.get(
          `/prices/get-prices-by-date?market_id=${activeMarket}&date=${selectedDate}`
        );

        if (response.status === 200) {
          setCurrentMarket(activeMarket);
          const fetchedProducts = response.data.map(
            (priceData: ProductPrice) =>
              ({
                id: priceData.id,
                name: priceData.product.name,
                price: priceData.price_value,
                measureUnit: priceData.product.unit_of_measurement,
                vendor: priceData.vendors_name,
              } as Product)
          );

          setProducts((prevProducts) => {
            return fetchedProducts;
          });

          const totalPages = Math.ceil(
            fetchedProducts.length / productsPerPage
          );
          setCurrentPage((prevPage) =>
            Math.max(Math.min(prevPage, totalPages), 1)
          );

          const newStartIndex = (currentPage - 1) * productsPerPage;
          const newEndIndex = newStartIndex + productsPerPage;

          setStartIndex(newStartIndex);
          setEndIndex(newEndIndex);

          const sortedProducts = [...fetchedProducts].sort((a, b) => {
            const aValue = a[sortConfig.key as keyof Product];
            const bValue = b[sortConfig.key as keyof Product];

            if (typeof aValue === "string" && typeof bValue === "string") {
              if (sortConfig.direction === "asc") {
                return aValue.localeCompare(bValue);
              }
              if (sortConfig.direction === "desc") {
                return bValue.localeCompare(aValue);
              }
            } else {
              if (sortConfig.direction === "asc") {
                return (aValue as number) - (bValue as number);
              }
              if (sortConfig.direction === "desc") {
                return (bValue as number) - (aValue as number);
              }
            }
            return 0;
          });

          setProductsToShow(sortedProducts.slice(newStartIndex, newEndIndex));
        }
      } catch (error) {
        toast({
          title: t("error"),
          description: t("errorFetchingPrices"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
      }
    }

    fetchTodaysPrices();
  }, [
    activeMarket,
    currentMarket,
    startIndex,
    endIndex,
    currentPage,
    selectedDate,
    sortConfig,
    t,
    toast,
  ]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  if (activeMarket === null) {
    return <></>;
  }

  const productTable = (
    <>
      {" "}
      <TableContainer mt={10} w={isSmallerScreen ? undefined : "60%"}>
        <Table>
          <Thead>
            <Tr cursor={"pointer"}>
              <Th
                textAlign={"center"}
                _hover={{
                  color: colorMode === "light" ? "green.600" : "green.200",
                }}
                onClick={() => requestSort("name")}
              >
                {t("name")}
              </Th>
              <Th
                textAlign={"center"}
                _hover={{
                  color: colorMode === "light" ? "green.600" : "green.200",
                }}
                onClick={() => requestSort("price")}
              >
                {t("price")}
              </Th>
              <Th
                textAlign={"center"}
                _hover={{
                  color: colorMode === "light" ? "green.600" : "green.200",
                }}
                onClick={() => requestSort("vendor")}
              >
                {t("vendor")}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {productsToShow.map((product) => (
              <Tr key={product.id}>
                <Td textAlign={"center"}>{product.name}</Td>
                <Td textAlign={"center"}>{`${product.price.toFixed(2)} KM/${
                  product.measureUnit
                }`}</Td>
                <Td textAlign={"center"}>{product.vendor}</Td>
              </Tr>
            ))}
            {Array.from({
              length: productsPerPage - productsToShow.length,
            }).map((_, index) => (
              <Tr key={`empty-row-${index}`}>
                <Td textAlign={"center"}>&nbsp;</Td>
                <Td textAlign={"center"}>&nbsp;</Td>
                <Td textAlign={"center"}>&nbsp;</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {Math.ceil(products.length / productsPerPage) > 1 && (
        <ButtonGroup spacing={2} size="md" pt={8} mb={-6}>
          {Array.from(
            { length: Math.ceil(products.length / productsPerPage) },
            (_, index) => (
              <Button
                key={index + 1}
                bgGradient={"linear(to-tr, green.400, yellow.300)"}
                color={colorMode === "light" ? "white" : "gray.700"}
                size={"sm"}
                fontSize={"md"}
                borderRadius={"50%"}
                _hover={{
                  transform: "scale(1.1)",
                  transition: "transform 0.2s ease",
                }}
                onClick={() => goToPage(index + 1)}
                isActive={index + 1 === currentPage}
              >
                {index + 1}
              </Button>
            )
          )}
        </ButtonGroup>
      )}
    </>
  );

  return (
    <Flex
      minW="95vw"
      minH={products.length === 0 ? undefined : "85vh"}
      direction="column"
      align="center"
      justify="center"
    >
      <HStack minW={"60vw"} justify={"start"} align={"start"}>
        <Text
          mt={isSmallerScreen ? 2 : 8}
          fontWeight="bold"
          w={isSmallerScreen ? "80%" : "60%"}
        >
          {t("pricesOn")}
          {date}
        </Text>

        <Box
          mt={isSmallerScreen ? undefined : "6"}
          ml={isSmallerScreen ? undefined : isMiddleScreen ? "-20" : "-44"}
        >
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            todayButton={t("today")}
            customInput={
              <Box
                borderWidth="1px"
                borderRadius="md"
                p="2"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Icon as={FaCalendarAlt} h={6} w={6} />
              </Box>
            }
            maxDate={new Date()}
          />
        </Box>
      </HStack>
      {products.length === 0 ? (
        <Box mt={10}>{t("emptyMarket")}</Box>
      ) : (
        productTable
      )}
    </Flex>
  );
};
