import stores, { StoreContext } from "./stores/stores";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Prototype from "./pages/Prototype";
import React from "react";

function App() {
  return (
    <React.StrictMode>
      <StoreContext.Provider value={stores}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prototype" element={<Prototype />} />
          </Routes>
        </BrowserRouter>
      </StoreContext.Provider>
    </React.StrictMode>
  );
}

export default App;
