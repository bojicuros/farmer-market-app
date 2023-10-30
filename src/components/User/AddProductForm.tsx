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
  Textarea,
  VStack,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import axios, { API_URL } from "../../config/general";
import { useTranslation } from "react-i18next";

type AddProductFormProps = {
  isOpen: boolean;
  close: () => void;
  handleOpenNotification: (success: boolean, message: string) => void;
};

const AddProductForm = ({
  isOpen,
  close,
  handleOpenNotification,
}: AddProductFormProps) => {
  const { colorMode } = useColorMode();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
      description: "",
      unitOfMeasurement: "",
      error: "",
    });
    close();
  };

  const leastDestructiveRef = useRef(null);
  const { t } = useTranslation();

  const addProduct = async () => {
    try {
      const productData: {
        name: string;
        unit_of_measurement: string;
        description?: string;
      } = {
        name: formData.name,
        unit_of_measurement: formData.unitOfMeasurement,
      };

      if (formData.description) {
        productData.description = formData.description;
      }

      const response = await axios.post(
        `${API_URL}/products/add-new-product`,
        productData
      );

      console.log(response);

      if (response.status === 200)
        handleOpenNotification(true, t("productAddSuccess"));
      else handleOpenNotification(false, t("productAddFail"));
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
          <VStack spacing={5}>
            <Input
              placeholder={`${t("product")} ${t("name")}`}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Textarea
              placeholder={t("descriptionOptional")}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <Input
              placeholder={t("measureUnit")}
              value={formData.unitOfMeasurement}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  unitOfMeasurement: e.target.value,
                })
              }
              required
            ></Input>
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
