import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "../src/router/AllRoutes";

function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
}

export const baseUrl = "http://localhost:4008/api";
export default App;
