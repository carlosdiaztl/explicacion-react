import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import InfoVuelos from "../components/pages/InfoVuelos";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vuelos" element={<InfoVuelos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
