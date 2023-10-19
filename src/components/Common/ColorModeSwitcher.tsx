import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const { t } = useTranslation();

  return (
    <IconButton
      mr={2} 
      justifySelf="flex-end"
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      isRound={true}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      title={t("darkMode")}
    />
  );
};
