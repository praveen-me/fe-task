import React from "react";
import { Toaster } from "react-hot-toast";
import Home from "./containers/Home";
import { StoreProvider } from "./store";

import "./App.css";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <>
          <Home />
          <Toaster position="top-right" reverseOrder={false} />
        </>
      </StoreProvider>
    </div>
  );
}

export default App;
