import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import axios from "axios";

// store
import { store } from "./store.ts";
import { BASE_URI } from "./config.ts";
import "./index.css";
import App from "./App.tsx";

// settings
axios.defaults.baseURL = BASE_URI;
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
