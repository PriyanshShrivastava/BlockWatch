import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import "./index.css";
import BlockContext from "./contexts/blockContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BlockContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BlockContext>
  </BrowserRouter>
);
