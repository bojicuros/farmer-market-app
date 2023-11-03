import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Input,
  VStack,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import axios, { API_URL } from "../../config/general";
import { useTranslation } from "react-i18next";

const DEFAULT_IMAGE =
  "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2021/08/farmers-market-produce-0812211.jpg";

type AddMarketFormProps = {
  isOpen: boolean;
  close: () => void;
  handleOpenNotification: (success: boolean, message: string) => void;
  onChildAction: () => void;
};

const AddMarketForm = ({
  isOpen,
  close,
  handleOpenNotification,
  onChildAction,
}: AddMarketFormProps) => {
  const { colorMode } = useColorMode();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    error: "",
  });

  const handleAddMarket = () => {
    const { name, address } = formData;
    if (!name || !address) {
      setFormData({
        ...formData,
        error: t("nameAndAddressNotEntered"),
      });
    } else {
      handleCloseForm();
      addMarket();
    }
  };

  const handleCloseForm = () => {
    setFormData({
      name: "",
      address: "",
      error: "",
    });
    close();
  };

  const leastDestructiveRef = useRef(null);
  const { t } = useTranslation();

  const addMarket = async () => {
    try {
      const response = await axios.post(`${API_URL}/markets/create`, {
        name: formData.name,
        address: formData.address,
        image_url: DEFAULT_IMAGE,
      });

      if (response.status === 201) {
        handleOpenNotification(true, t("marketCreateSuccess"));
        onChildAction();
      } else handleOpenNotification(false, t("marketCreateFail"));
    } catch (e) {
      handleOpenNotification(false, t("marketCreateFail"));
    }
  };

  return (
    <AlertDialog
      leastDestructiveRef={leastDestructiveRef}
      isOpen={isOpen}
      onClose={handleCloseForm}
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          {t("addMarket")}
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <VStack spacing={5} align="left">
            <Text> {t("marketsName")}</Text>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Text>{t("marketsAddress")}</Text>
            <Input
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
            <Text color={"red.400"}>{formData.error}</Text>
          </VStack>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            bg={colorMode === "light" ? "green.400" : "green.500"}
            _hover={{
              bg: colorMode === "light" ? "green.500" : "green.600",
            }}
            color={colorMode === "light" ? "white" : "gray.900"}
            onClick={handleAddMarket}
          >
            {t("confirm")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddMarketForm;
