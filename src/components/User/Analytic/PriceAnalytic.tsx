import {
  Box,
  Button,
  Flex,
  Select,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import LineChart from "./LineChart";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { axiosPrivate } from "../../../config/general";
import { AuthUser } from "../../../context/AuthContext";

type PriceAnalyticProps = {
  user: AuthUser;
};

type ProductsAndMarkets = {
  id: string;
  name: string;
  unit_of_measurement: string;
  market: string;
  market_id: string;
};

type Product = {
  productId: string;
  productName: string;
};

type Market = {
  marketName: string;
  products: Product[];
};

type PriceData = {
  price_date: string;
  price_value: number;
};

type Vendor = {
  id: string;
  first_name: string;
  last_name: string;
};

const PriceAnalytic = ({ user }: PriceAnalyticProps) => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { t } = useTranslation();
  const toast = useToast();

  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");

  const [fetchedProducts, setFetchedProducts] = useState<ProductsAndMarkets[]>(
    []
  );
  const [concurrentVendors, setConcurrentVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState("");

  const [priceDates, setPriceDates] = useState<string[]>([]);
  const [priceValues, setPriceValues] = useState<number[]>([]);
  const [concurrentPriceValues, setConcurrentPriceValues] = useState<number[]>(
    []
  );

  const handleMarketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMarket(event.target.value);
    setSelectedVendor("");
    setPriceValues([]);
    setPriceDates([]);
    setConcurrentPriceValues([]);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value);
    setSelectedVendor("");
    setPriceValues([]);
    setPriceDates([]);
    setConcurrentPriceValues([]);
  };

  const handleVendorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVendor(event.target.value);
  };

  const getMonthlyPrices = async () => {
    if (selectedMarket) {
      const product = marketsAndProducts[selectedMarket].products.find(
        (product) => product.productId === selectedProduct
      );

      if (product) {
        setSelectedProductName(product.productName);
      }
    }
    if (!selectedMarket || !selectedProduct)
      return toast({
        title: t("error"),
        description: t("selectMarketAndProduct"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    try {
      const response = await axiosPrivate.get(
        `/prices/get-monthly-prices?user_id=${user.userId}&market_id=${selectedMarket}&product_id=${selectedProduct}`
      );
      if (response.status === 200) {
        const dates = [];
        const values = [];

        for (const record of response.data as PriceData[]) {
          dates.push(record.price_date);
          values.push(record.price_value);
        }

        setPriceDates(dates);
        setPriceValues(values);

        getConcurrentVendors();
      } else
        toast({
          title: t("error"),
          description: t("errorFetchingMonthlyPrices"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorFetchingMonthlyPrices"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  };

  const getConcurrentVendorsMonthlyPrices = async () => {
    if (!selectedVendor)
      return toast({
        title: t("error"),
        description: t("selectOtherVendor"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    try {
      const response = await axiosPrivate.get(
        `/prices/get-monthly-prices?user_id=${selectedVendor}&market_id=${selectedMarket}&product_id=${selectedProduct}`
      );
      if (response.status === 200) {
        const values = [];

        for (const record of response.data as PriceData[])
          values.push(record.price_value);

        setConcurrentPriceValues(values);
      } else
        toast({
          title: t("error"),
          description: t("errorFetchingMonthlyPrices"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorFetchingMonthlyPrices"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  };

  const getConcurrentVendors = async () => {
    try {
      const response = await axiosPrivate.get(
        `/products/users-who-sell-product?user_id=${user.userId}&market_id=${selectedMarket}&product_id=${selectedProduct}`
      );
      if (response.status === 200) {
        setConcurrentVendors(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(
        `/products/get-users-products?user_id=${user.userId}`
      );
      if (response.status === 200) {
        setFetchedProducts(response.data);
      } else
        toast({
          title: t("error"),
          description: t("errorFetchingVendorsProducts"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorFetchingVendorsProducts"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  }, [t, toast, user]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const marketsAndProducts: Record<string, Market> = fetchedProducts.reduce(
    (acc, current) => {
      if (!acc[current.market_id]) {
        acc[current.market_id] = {
          marketName: current.market,
          products: [],
        };
      }

      if (acc[current.market_id]) {
        acc[current.market_id].products.push({
          productId: current.id,
          productName: current.name,
        });
      }
      return acc;
    },
    {} as Record<string, Market>
  );

  const LineChartWrapper = () => {
    const lineChartData = [
      {
        name: `${
          selectedVendor ? t("yourPrice") : t("pricesOf")
        } ${selectedProductName}`,
        data: priceValues,
      },
      {
        name: `${
          concurrentVendors.find((vendor) => vendor.id === selectedVendor)
            ?.first_name || ""
        } ${t("concurrentPrice")} ${selectedProductName}`,
        data: concurrentPriceValues,
      },
    ];

    const lineChartOptions = {
      chart: {
        toolbar: {
          show: true,
        },
      },
      theme: {
        mode: colorMode,
      },
      tooltip: {
        theme: colorMode,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: priceDates,
        labels: {
          style: {
            colors: "#c8cfca",
            fontSize: "8px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#c8cfca",
            fontSize: "12px",
          },
        },
      },
      legend: {
        show: false,
      },
      grid: {
        strokeDashArray: 4,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0.2,
          stops: [],
        },
        colors: ["#4fd175", "#f5f07d"],
      },
      colors: ["#4fd175", "#f5f07d"],
    };

    return <LineChart data={lineChartData} options={lineChartOptions} />;
  };

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Box p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {t("priceAnalytic")}
          </Text>
        </Box>
      </Box>
      <Box h={"50vh"}>
        <Flex
          justifyContent="space-evenly"
          flexDirection={isSmallerScreen ? "column" : "row"}
          gap={isSmallerScreen ? 30 : 50}
          pb={6}
        >
          <Select
            placeholder={t("selectMarket")}
            value={selectedMarket}
            onChange={handleMarketChange}
          >
            {Object.keys(marketsAndProducts).map((marketId) => (
              <option key={marketId} value={marketId}>
                {marketsAndProducts[marketId].marketName}
              </option>
            ))}
          </Select>
          <Select
            placeholder={t("selectProduct")}
            value={selectedProduct}
            onChange={handleProductChange}
          >
            {selectedMarket &&
              marketsAndProducts[selectedMarket].products.map((product) => (
                <option key={product.productId} value={product.productId}>
                  {product.productName}
                </option>
              ))}
          </Select>
          <Button
            onClick={getMonthlyPrices}
            minW={"10%"}
            mr={10}
            bg={colorMode === "light" ? "green.400" : "green.500"}
            _hover={{
              bg: colorMode === "light" ? "green.500" : "green.600",
            }}
            color={colorMode === "light" ? "white" : "gray.900"}
          >
            {t("confirm")}
          </Button>
        </Flex>
        <Flex
          justifyContent="space-evenly"
          flexDirection={isSmallerScreen ? "column" : "row"}
          gap={isSmallerScreen ? 30 : 50}
          pb={20}
          hidden={false}
        >
          <Text>{t("comparePrices")}</Text>
          <Select
            placeholder={t("selectVendor")}
            value={selectedVendor}
            onChange={handleVendorChange}
          >
            {concurrentVendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {`${vendor.first_name} ${vendor.last_name}`}
              </option>
            ))}
          </Select>
          <Button
            onClick={getConcurrentVendorsMonthlyPrices}
            minW={"10%"}
            mr={10}
            bg={colorMode === "light" ? "green.400" : "green.500"}
            _hover={{
              bg: colorMode === "light" ? "green.500" : "green.600",
            }}
            color={colorMode === "light" ? "white" : "gray.900"}
          >
            {t("compare")}
          </Button>
        </Flex>
        <LineChartWrapper />
      </Box>
    </Flex>
  );
};

export default PriceAnalytic;
