import React, { useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

interface PopupNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  isSuccess: boolean;
  message: string;
  duration?: number;
}

const PopupNotification: React.FC<PopupNotificationProps> = ({
  isOpen,
  onClose,
  isSuccess,
  message,
  duration = 3000,
}) => {
  const { colorMode } = useColorMode();
  const bgColor = isSuccess ? "green.100" : "red.100";
  const bgColorDark = isSuccess ? "green.400" : "red.400";
  const iconColor = isSuccess ? "green.500" : "red.500";
  const iconColorDark = isSuccess ? "green.700" : "red.700";
  const hoverColor = colorMode === "light" ? "blue.400" : "blue.600";
  const icon = isSuccess ? <CheckCircleIcon /> : <WarningIcon />;
  const title = isSuccess ? "Success" : "Error";

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  const leastDestructiveRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={leastDestructiveRef}
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay />
      <AlertDialogContent
        bg={colorMode === "light" ? bgColor : bgColorDark}
        color="black"
      >
        <AlertDialogHeader
          fontSize="lg"
          fontWeight="bold"
          color={colorMode === "light" ? iconColor : iconColorDark}
        >
          {icon} {title}
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{message}</AlertDialogBody>
        <AlertDialogFooter>
          <Button
            onClick={onClose}
            bg={colorMode === "light" ? "blue.300" : "blue.700"}
            _hover={{ background: hoverColor }}
            ml={3}
          >
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PopupNotification;
