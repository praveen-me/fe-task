import React from "react";
import { Toaster } from "react-hot-toast";

import "./App.css";
import CreateJob from "./components/CreateJob";

function App() {
  return (
    <div className="App">
      <CreateJob />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
