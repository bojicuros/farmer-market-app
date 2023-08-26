import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  useBreakpointValue,
  useColorMode,
  Link,
} from "@chakra-ui/react";

const RegistrationForm = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

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
  };

  return (
    <Box mt={isSmallerScreen ? "16" : "0"} alignItems="flex-start" p={isSmallerScreen ? "6" : "0"}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" p={5}>
          <Input
            placeholder="First Name"
            size="md"
            mb="4"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Last Name"
            size="md"
            mb="4"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
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
          <Input
            placeholder="Password"
            size="md"
            mb="4"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Confirm Password"
            size="md"
            mb="4"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Phone Number (Optional)"
            size="md"
            mb="4"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <Button
            bgGradient="linear(to-tr, green.400, yellow.300)"
            color={colorMode === "light" ? "white" : "gray.700"}
            _hover={{ opacity: 0.8 }}
            type="submit"
          >
            Register
          </Button>
          <Flex mt="4" justify="center" align="center">
            <Link
              color={colorMode === "light" ? "green.500" : "green.300"}
              fontSize="sm"
              href="/login"
            >
              Already registered? Go to login.
            </Link>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default RegistrationForm;
