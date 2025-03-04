import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../Admin/components/Admin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<Admin/>} />
    </Routes>
  );
}
