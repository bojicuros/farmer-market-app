import { useEffect, useState } from "react";
import EmailConfirmCodeForm from "./EmailConfirmCodeForm";
import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import axios, { API_URL } from "../../config/general";
import { AuthUser } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type EmailConfirmationProps = {
  user: AuthUser;
};

const EmailConfirmation = ({ user }: EmailConfirmationProps) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCodeConfirmed) {
      navigate("/login");
    }
  }, [isCodeConfirmed, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/require-token?email=${user.email}`);
      setIsCodeSent(true);
    } catch (error) {
      setIsCodeSent(false);
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="60vh"
      flexDirection="column"
    >
      {!isCodeSent ? (
        <Box>
          <form onSubmit={handleSubmit}>
            <Flex direction="column" p={5} alignItems="center">
              <Text size="md" mb={2}>
                You didn't receive code yet?
              </Text>
              <Button
                bgGradient="linear(to-tr, green.400, yellow.300)"
                color={colorMode === "light" ? "white" : "gray.700"}
                _hover={{ opacity: 0.8 }}
                type="submit"
              >
                Send
              </Button>
            </Flex>
          </form>
        </Box>
      ) : (
        <Box>
          <EmailConfirmCodeForm
            setIsCodeConfirmed={setIsCodeConfirmed}
            createdUserId={user.userId}
          />
        </Box>
      )}
    </Flex>
  );
};

export default EmailConfirmation;
