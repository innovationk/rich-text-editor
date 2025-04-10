import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from ".";

const rootNode = document.getElementById("root");
const root = createRoot(rootNode, {
  onCaughtError: (error) => {
    console.error(error);
  },
});

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
