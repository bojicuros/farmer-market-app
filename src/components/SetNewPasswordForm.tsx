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

const SetNewPasswordForm = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
//   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);
    setPasswordsDoNotMatch(false);
    // navigate("/");
  };

  return (
    <Box mt={isSmallerScreen ? "16" : "0"} alignItems="flex-start" p={isSmallerScreen ? "6" : "0"}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" p={5}>
          <Input
            placeholder="New password"
            size="md"
            mb="4"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Confirm new password"
            size="md"
            mb="4"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <Button
            bgGradient="linear(to-tr, green.400, yellow.300)"
            color={colorMode === "light" ? "white" : "gray.700"}
            _hover={{ opacity: 0.8 }}
            type="submit"
          >
            Continue
          </Button>
          {passwordsDoNotMatch && (
            <Text mt="2" color="red">
              Passwords do not match.
            </Text>
          )}
        </Flex>
      </form>
    </Box>
  );
};

export default SetNewPasswordForm;
