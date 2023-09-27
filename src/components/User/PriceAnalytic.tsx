import {
  Box,
  Button,
  Flex,
  Select,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import LineChart from "./LineChart";
import { useState } from "react";

const PriceAnalytic = () => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });

  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleMarketChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setSelectedMarket(event.target.value);
  };

  const handleProductChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setSelectedProduct(event.target.value);
  };

  const handleConfirmClick = () => {
    console.log("Selected Market:", selectedMarket);
    console.log("Selected Product:", selectedProduct);
  };

  const lineChartData = [
    {
      name: "Prices of apple",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 430, 190, 310, 550],
    },
    {
      name: "Prices of cherry",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 260, 590, 320, 440],
    },
  ];

  const lineChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "12px",
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
      strokeDashArray: 5,
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

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Box p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {"Price Analytic"}
          </Text>
        </Box>
      </Box>
      <Box h={"50vh"}>
        <Flex
          justifyContent="space-evenly"
          flexDirection={isSmallerScreen ? "column" : "row"}
          gap={isSmallerScreen ? 30 : 50}
          pb={20}
        >
          <Select
            placeholder="Select Market"
            value={selectedMarket}
            onChange={handleMarketChange}
          >
            <option value="market1">Market 1</option>
            <option value="market2">Market 2</option>
          </Select>
          <Select
            placeholder="Select Product"
            value={selectedProduct}
            onChange={handleProductChange}
          >
            <option value="product1">Product 1</option>
            <option value="product2">Product 2</option>
          </Select>
          <Button
            onClick={handleConfirmClick}
            minW={"10%"}
            mr={10}
            bg={colorMode === "light" ? "green.400" : "green.500"}
            _hover={{
              bg: colorMode === "light" ? "green.500" : "green.600",
            }}
            color={colorMode === "light" ? "white" : "gray.900"}
          >
            Confirm
          </Button>
        </Flex>
        <LineChart data={lineChartData} options={lineChartOptions} />
      </Box>
    </Flex>
  );
};

export default PriceAnalytic;
