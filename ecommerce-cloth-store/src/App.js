import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerRoutes from "./Routes/CustomerRoutes";
import AdminRoutes from "./Routes/AdminRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </>
  );
}

export default App;
