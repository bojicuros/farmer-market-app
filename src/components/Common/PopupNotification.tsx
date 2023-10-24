import React, { useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  useColorMode,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

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
  duration = 2000,
}) => {
  const { colorMode } = useColorMode();
  const bgColor = isSuccess ? "green.100" : "red.100";
  const bgColorDark = isSuccess ? "green.400" : "red.400";
  const iconColor = isSuccess ? "green.500" : "red.500";
  const iconColorDark = isSuccess ? "green.700" : "red.700";
  const icon = isSuccess ? <CheckCircleIcon /> : <WarningIcon />;
  const { t } = useTranslation();
  const title = isSuccess ? t("success") : t("error");

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
        <AlertDialogBody mb={5}>{message}</AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PopupNotification;
