import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerRoutes from "./Routes/CustomerRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>
    </>
  );
}

export default App;
