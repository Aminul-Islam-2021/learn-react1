import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store3 } from "./project3/store/store3.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store3}>
      <App />
    </Provider>
  </StrictMode>,
);
