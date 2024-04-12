import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/app.css";
import { ThemeProvider } from "./context/ThemeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
