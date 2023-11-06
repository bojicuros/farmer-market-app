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
  Select,
} from "@chakra-ui/react";
import axios, { API_URL } from "../../../config/general";
import { useTranslation } from "react-i18next";
import { MeasureUnits } from "../../../util/enums";

type AddProductFormProps = {
  isOpen: boolean;
  close: () => void;
  handleOpenNotification: (success: boolean, message: string) => void;
  onChildAction: () => void;
};

const AddProductForm = ({
  isOpen,
  close,
  handleOpenNotification,
  onChildAction,
}: AddProductFormProps) => {
  const { colorMode } = useColorMode();

  const [formData, setFormData] = useState({
    name: "",
    unitOfMeasurement: "",
    error: "",
  });

  const handleAddProduct = () => {
    const { name, unitOfMeasurement } = formData;
    if (!name || !unitOfMeasurement) {
      setFormData({
        ...formData,
        error: t("nameAndUnitNotEntered"),
      });
    } else {
      handleCloseForm();
      addProduct();
    }
  };

  const handleCloseForm = () => {
    setFormData({
      name: "",
      unitOfMeasurement: "",
      error: "",
    });
    close();
  };

  const leastDestructiveRef = useRef(null);
  const { t } = useTranslation();

  const addProduct = async () => {
    try {
      const response = await axios.post(`${API_URL}/products/add-new-product`, {
        name: formData.name,
        unit_of_measurement: formData.unitOfMeasurement,
      });

      if (response.status === 201) {
        handleOpenNotification(true, t("productAddSuccess"));
        onChildAction();
      } else handleOpenNotification(false, t("productAddFail"));
    } catch (e) {
      handleOpenNotification(false, t("productAddFail"));
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
          {t("addNewProduct")}
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <VStack spacing={5} align="left">
            <Text> {t("productsName")}</Text>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Text>{t("measureUnit")}</Text>
            <Select
              value={formData.unitOfMeasurement}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  unitOfMeasurement: e.target.value,
                })
              }
              required
            >
              <option value="">------</option>
              {Object.values(MeasureUnits).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>

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
            onClick={handleAddProduct}
          >
            {t("confirm")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddProductForm;
