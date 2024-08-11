import { useState } from "react";
import "./App.css";
import VehicleMap from "./components/VehicleMap";

function App() {
  return (
    <>
      <div className="App">
        <h1>Vehicle Tracker</h1>
        <VehicleMap />
      </div>
    </>
  );
}

export default App;
