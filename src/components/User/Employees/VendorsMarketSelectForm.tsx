import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  VStack,
  Checkbox,
  useColorMode,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import axios, { API_URL } from "../../../config/general";
import { t } from "i18next";

type VendorsMarketSelectFormProps = {
  markets: string[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (markets: string[]) => void;
  handleOpenNotification: (success: boolean, message: string) => void;
};

type MarketInfo = {
  id: string;
  name: string;
  address: string;
  is_open: boolean;
  created_at: string;
};

const VendorsMarketSelectForm = ({
  markets,
  isOpen,
  onClose,
  onSubmit,
  handleOpenNotification,
}: VendorsMarketSelectFormProps) => {
  const { colorMode } = useColorMode();
  const [allMarkets, setAllMarkets] = useState([]);
  const [selectedMarkets, setSelectedMarkets] = useState(markets);
  const leastDestructiveRef = useRef(null);

  const fetchMarkets = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/markets/get-all`);
      if (response.status === 200)
        setAllMarkets(response.data.map((market: MarketInfo) => market.name));
      else handleOpenNotification(false, t("errorFetchingMarkets"));
    } catch (error) {
      handleOpenNotification(false, t("errorFetchingMarkets"));
    }
  }, [handleOpenNotification]);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  const handleMarketCheckboxChange = (marketName: string) => {
    if (selectedMarkets.includes(marketName)) {
      setSelectedMarkets((prevSelectedMarkets) =>
        prevSelectedMarkets.filter((name) => name !== marketName)
      );
    } else {
      setSelectedMarkets((prevSelectedMarkets) => [
        ...prevSelectedMarkets,
        marketName,
      ]);
    }
  };

  const handleConfirm = () => {
    if (selectedMarkets.length > 0) {
      onClose();
      onSubmit(selectedMarkets);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedMarkets(markets);
  };

  return (
    <AlertDialog
      leastDestructiveRef={leastDestructiveRef}
      isOpen={isOpen}
      onClose={handleClose}
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Select Markets
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <VStack spacing={4} align="left">
            {allMarkets.map((market) => (
              <Checkbox
                key={market}
                isChecked={selectedMarkets.includes(market)}
                onChange={() => handleMarketCheckboxChange(market)}
              >
                {market}
              </Checkbox>
            ))}
          </VStack>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            bg={colorMode === "light" ? "green.400" : "green.500"}
            _hover={{
              bg: colorMode === "light" ? "green.500" : "green.600",
            }}
            color={colorMode === "light" ? "white" : "gray.900"}
            onClick={handleConfirm}
            isDisabled={selectedMarkets.length === 0}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VendorsMarketSelectForm;
