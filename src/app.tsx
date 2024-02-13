import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes/routes";
import "./styles/global.css";

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
