import App from "./App";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { ColorModeScript } from "@chakra-ui/react";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import enTranslations from "./i18n/en.json";
import srTranslations from "./i18n/sr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    sr: {
      translation: srTranslations,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>
);