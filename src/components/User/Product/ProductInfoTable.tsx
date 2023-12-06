import {
  Box,
  Button,
  Flex,
  HStack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import ProductTableRow from "./ProductTableRow";
import VendorProductRow from "./VendorProductRow";
import { useTranslation } from "react-i18next";
import { axiosPrivate } from "../../../config/general";
import { AuthUser } from "../../../context/AuthContext";
import AddProductForm from "./AddProductForm";
import VendorProductAddingRow from "./VendorProductAddingRow";

export type ProductInfo = {
  id: string;
  name: string;
  unit_of_measurement: string;
  created_at: string;
};

export type VendorProductInfo = {
  id: string;
  name: string;
  unit_of_measurement: string;
  market: string;
  market_id: string;
  user_id: string;
};

type ProductInfoTableProps = {
  areProductsVendors: boolean;
  user: AuthUser;
};

const ProductInfoTable = ({
  areProductsVendors,
  user,
}: ProductInfoTableProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const toast = useToast();
  const [refresh, setRefresh] = useState(false);

  const [isAddingProductActive, setIsAddingProductActive] = useState(false);

  const captionsProducts = [t("product"), t("unit"), t("addedAt"), "", ""];
  const captionsVendorProducts = [t("product"), t("unit"), t("market"), ""];
  const captions = areProductsVendors
    ? captionsVendorProducts
    : captionsProducts;

  const handleChildAction = () => {
    setTimeout(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, 1500);
  };

  const [productData, setProductData] = useState<ProductInfo[] | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!areProductsVendors) {
      try {
        const response = await axiosPrivate.get(`/products/get-all-products`);
        const fetchedProducts = response.data;
        if (fetchedProducts) {
          setProductData(fetchedProducts);
        }
      } catch (error) {
        toast({
          title: t("error"),
          description: t("errorFetchingProducts"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
      }
    }
  }, [setProductData, areProductsVendors, t, toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, refresh]);

  const showAddingProductForm = () => {
    setIsAddingProductActive(true);
  };

  const hideAddingProductForm = () => {
    setIsAddingProductActive(false);
  };

  const [vendorsProductAdding, areVendorsProductAdding] = useState(false);

  const [vendorsProducts, setVendorsProducts] = useState<
    VendorProductInfo[] | null
  >(null);

  const fetchVendorsProducts = useCallback(async () => {
    if (areProductsVendors && !vendorsProductAdding) {
      try {
        const response = await axiosPrivate.get(
          `/products/get-users-products?user_id=${user.userId}`
        );
        if (response.status === 200) {
          const fetchedProducts = response.data;
          setVendorsProducts(fetchedProducts);
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
    }
  }, [
    setVendorsProducts,
    areProductsVendors,
    user,
    vendorsProductAdding,
    t,
    toast,
  ]);

  useEffect(() => {
    fetchVendorsProducts();
  }, [fetchVendorsProducts, refresh]);

  const [nonVendorsProducts, setNonVendorsProducts] = useState<
    VendorProductInfo[] | null
  >(null);

  const fetchNonVendorsProducts = useCallback(async () => {
    if (areProductsVendors && vendorsProductAdding) {
      try {
        const response = await axiosPrivate.get(
          `/products/get-products-not-associated-with-user?user_id=${user.userId}`
        );
        if (response.status === 200) {
          const fetchedProducts = response.data;
          setNonVendorsProducts(fetchedProducts);
        } else
          toast({
            title: t("error"),
            description: t("errorFetchingNonVendorsProducts"),
            status: "error",
            duration: 1500,
            position: "top",
            isClosable: true,
          });
      } catch (error) {
        toast({
          title: t("error"),
          description: t("errorFetchingNonVendorsProducts"),
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true,
        });
      }
    }
  }, [
    setNonVendorsProducts,
    areProductsVendors,
    user,
    vendorsProductAdding,
    t,
    toast,
  ]);

  useEffect(() => {
    fetchNonVendorsProducts();
  }, [fetchNonVendorsProducts, refresh]);

  return (
    <Flex direction="column" pt={{ base: "40px", md: "20px" }}>
      <Box overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Flex
          p="6px 0px 22px 0px"
          align={"row"}
          justifyContent={"space-between"}
        >
          <HStack>
            <Text
              fontSize="xl"
              color={
                areProductsVendors
                  ? vendorsProductAdding
                    ? "gray.400"
                    : textColor
                  : textColor
              }
              fontWeight="bold"
              cursor={areProductsVendors ? "pointer" : undefined}
              onClick={() => areVendorsProductAdding(false)}
            >
              {areProductsVendors ? t("vendorProducts") : t("productTable")}
            </Text>
            {areProductsVendors && (
              <Text
                fontSize="xl"
                color={vendorsProductAdding ? textColor : "gray.400"}
                fontWeight="bold"
                ml={2}
                cursor={"pointer"}
                onClick={() => areVendorsProductAdding(true)}
              >
                {t("addProducts")}
              </Text>
            )}
          </HStack>

          {!areProductsVendors && (
            <Button
              bg={colorMode === "light" ? "green.400" : "green.500"}
              _hover={{
                bg: colorMode === "light" ? "green.500" : "green.600",
              }}
              color={colorMode === "light" ? "white" : "gray.900"}
              onClick={showAddingProductForm}
              mr={6}
            >
              {t("addProduct")}
            </Button>
          )}
        </Flex>
        {(productData && productData.length > 0) ||
        (vendorsProducts && vendorsProducts.length > 0) ||
        vendorsProductAdding ? (
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
                {!areProductsVendors
                  ? productData &&
                    productData.map((row: ProductInfo) => (
                      <ProductTableRow
                        key={`${row.id}`}
                        id={row.id}
                        name={row.name}
                        unit_of_measurement={row.unit_of_measurement}
                        created_at={row.created_at}
                        onChildAction={handleChildAction}
                      />
                    ))
                  : !vendorsProductAdding
                  ? vendorsProducts &&
                    vendorsProducts.map((row: VendorProductInfo) => (
                      <VendorProductRow
                        key={row.id + row.market_id}
                        id={row.id}
                        name={row.name}
                        unit_of_measurement={row.unit_of_measurement}
                        market={row.market}
                        market_id={row.market_id}
                        user_id={user.userId}
                        onChildAction={handleChildAction}
                      />
                    ))
                  : nonVendorsProducts &&
                    nonVendorsProducts.map((row: VendorProductInfo) => (
                      <VendorProductAddingRow
                        key={row.id + row.market_id}
                        id={row.id}
                        name={row.name}
                        unit_of_measurement={row.unit_of_measurement}
                        market={row.market}
                        market_id={row.market_id}
                        user_id={user.userId}
                        onChildAction={handleChildAction}
                      />
                    ))}
              </Tbody>
            </Table>
          </Box>
        ) : (
          <Text mt={5} ml={5}>
            {areProductsVendors
              ? t("noVendorsProducts")
              : t("noMarketsProducts")}
          </Text>
        )}
      </Box>

      <AddProductForm
        isOpen={isAddingProductActive}
        close={hideAddingProductForm}
        onChildAction={handleChildAction}
      ></AddProductForm>
    </Flex>
  );
};

export default ProductInfoTable;
