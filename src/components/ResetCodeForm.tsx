import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Input,
  Button,
  useBreakpointValue,
  useColorMode,
  Text,
} from "@chakra-ui/react";

type Props = {
  setIsCodeConfirmed: (arg0 : boolean) => void;
};

const ResetCodeForm = (props: Props) => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
  //   const navigate = useNavigate();

  const [isIncorrectCode, setIsIncorrectCode] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setIsIncorrectCode(false);
    props.setIsCodeConfirmed(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);
    // navigate("/");
  };

  return (
    <Box mt={isSmallerScreen ? "16" : "0"} alignItems="flex-start" p={isSmallerScreen ? "10" : "0"}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" p={5}>
          <Input
            placeholder="Code"
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
          >
            Confirm
          </Button>
          {isIncorrectCode && (
            <Text mt="2" color="red">
              Incorrect code. Please try again.
            </Text>
          )}
        </Flex>
      </form>
    </Box>
  );
};

export default ResetCodeForm;
