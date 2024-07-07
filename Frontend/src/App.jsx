import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "../src/router/AllRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  );
}
// https://realtime-chatapp-1.onrender.com/signin
// export const baseUrl = "http://localhost:4008/api";
export const baseUrl = "https://realtime-chatapp-1.onrender.com/api";
export default App;
