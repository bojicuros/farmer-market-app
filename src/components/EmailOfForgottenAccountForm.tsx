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
  setIsEmailConfirmed: (arg0: boolean) => void;
};

const EmailOfForgottenAccountForm = (props: Props) => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
  //   const navigate = useNavigate();

  const [isValidEmail, setIsValidEmail] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setIsValidEmail(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.setIsEmailConfirmed(true);
    console.log(formData);
    // navigate("/");
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
            placeholder="Email"
            size="md"
            mb="4"
            name="email"
            type="email"
            value={formData.email}
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
          {!isValidEmail && (
            <Text mt="2" color="red">
              Invalid email. Please try again.
            </Text>
          )}
        </Flex>
      </form>
    </Box>
  );
};

export default EmailOfForgottenAccountForm;
