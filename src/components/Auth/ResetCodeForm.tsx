import {
  Box,
  Flex,
  Input,
  Button,
  useBreakpointValue,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios  from "../../config/general";
import { useTranslation } from "react-i18next";

const CODE_LENGTH = 6;

type ResetCodeFormProps = {
  setIsCodeConfirmed: (arg0: boolean) => void;
  setUserCode: (arg0: string) => void;
  userEmail: string;
};

const ResetCodeForm = ({
  setIsCodeConfirmed,
  userEmail,
  setUserCode,
}: ResetCodeFormProps) => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const toast = useToast();

  const [isLengthInvalid, setIsLengthInvalid] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (value.length === CODE_LENGTH) setIsLengthInvalid(false);
    else setIsLengthInvalid(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`/auth/validate-reset-token`, {
        email: userEmail,
        token: formData.code,
      });
      setIsCodeConfirmed(true);
      setUserCode(formData.code);
    } catch (e) {
      toast({
        title: t("error"),
        description: t("wrongCode"),
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      mt={isSmallerScreen ? "16" : "0"}
      alignItems="flex-start"
      p={isSmallerScreen ? "10" : "0"}
    >
      <form onSubmit={handleSubmit}>
        <Flex direction="column" p={5}>
          <Input
            placeholder={t("code")}
            size="md"
            mb="4"
            name="code"
            type="number"
            value={formData.code}
            onChange={handleInputChange}
            required
          />
          <Button
            bgGradient="linear(to-tr, green.400, yellow.300)"
            color={colorMode === "light" ? "white" : "gray.700"}
            _hover={{ opacity: 0.8 }}
            type="submit"
            disabled={!isLengthInvalid}
          >
            {t("confirm")}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default ResetCodeForm;
