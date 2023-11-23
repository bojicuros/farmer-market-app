import App from "./App";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { ColorModeScript } from "@chakra-ui/react";
import "./i18n";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <App />
  </StrictMode>
);
