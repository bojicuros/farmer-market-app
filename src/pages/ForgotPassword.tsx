import { VStack, Flex, Text, Box, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import ResetCodeForm from "../components/Auth/ResetCodeForm";
import SetNewPasswordForm from "../components/Auth/SetNewPasswordForm";
import { useState } from "react";
import EmailOfForgottenAccountForm from "../components/Auth/EmailOfForgottenAccountForm";

const ForgotPassword = () => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const flexDirection = isSmallerScreen ? "column" : "row";
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userCode, setUserCode] = useState("");

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <VStack flex="1" p={5}>
        <Navbar />
        <Flex
          direction={flexDirection}
          p={isSmallerScreen ? "0" : "28"}
          alignSelf="center"
          justifyContent={"space-between"}
          minW={"100%"}
        >
          <Box mt={isSmallerScreen ? "16" : "0"}>
            <Text fontSize="3xl" fontWeight="semibold">
              Forgot Password?
            </Text>
            <Text
              fontSize="4xl"
              fontWeight="bold"
              bgGradient="linear(to-r, green.500, yellow.300, green.300)"
              bgClip="text"
            >
              Enter the code to reset password
            </Text>
            <Text>
              Please enter the code you've received to reset your password.
            </Text>
          </Box>
          {!isEmailConfirmed && (
            <EmailOfForgottenAccountForm
              setIsEmailConfirmed={setIsEmailConfirmed} setUserEmail={setUserEmail}
            />
          )}
          {isEmailConfirmed && !isCodeConfirmed && (
            <ResetCodeForm userEmail={userEmail} setIsCodeConfirmed={setIsCodeConfirmed} setUserCode={setUserCode}/>
          )}
          {isEmailConfirmed && isCodeConfirmed && <SetNewPasswordForm userCode={userCode} userEmail={userEmail} />}
        </Flex>
      </VStack>
      <Footer />
    </Flex>
  );
};

export default ForgotPassword;
