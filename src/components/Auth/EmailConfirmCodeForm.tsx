import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  useBreakpointValue,
  useColorMode,
  Text,
  Link
} from "@chakra-ui/react";
import axios, { API_URL } from "../../config/general";

type EmailConfirmCodeFormProps = {
  setIsCodeConfirmed: (arg0: boolean) => void;
  createdUserId: string | null;
};

const EmailConfirmCodeForm = ({
  setIsCodeConfirmed,
  createdUserId,
}: EmailConfirmCodeFormProps) => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();

  const [formData, setFormData] = useState({
    code: "",
  });

  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isIncorrectCode, setIsIncorrectCode] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post(`${API_URL}/auth/email-token-confirm`, {
        user_id: createdUserId,
        token: formData.code,
      });
      setIsCodeConfirmed(true);
    } catch (error) {
      setIsIncorrectCode(true);
      setAttemptsLeft(attemptsLeft - 1);
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
            disabled={attemptsLeft === 0}
          >
            Confirm
          </Button>
          {isIncorrectCode && (
            <Text mt="2" color="red">
              Incorrect code.{" "}
              {attemptsLeft > 0
                ? `${attemptsLeft} attempts left.`
                : "Profile is deleted."}
            </Text>
          )}
          {attemptsLeft === 0 && (
            <Flex mt="4" justify="center" align="center">
              <Link
                color={colorMode === "light" ? "green.500" : "green.300"}
                fontSize="sm"
                href="/register"
              >
                Try again and enter mail you can confirm.
              </Link>
            </Flex>
          )}
        </Flex>
      </form>
    </Box>
  );
};

export default EmailConfirmCodeForm;
