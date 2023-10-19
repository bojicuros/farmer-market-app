import { useTranslation } from "react-i18next";
import { Select } from "@chakra-ui/react";

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select
      defaultValue={i18n.language}
      w={"18"}
      minW={"18"}
      onChange={(e) => changeLanguage(e.target.value)}
      title={t("language")}
    >
      <option value="en">EN</option>
      <option value="sr">SR</option>
    </Select>
  );
};
