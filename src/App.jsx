// App.jsx
import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import MainCanvas from "./components/MainTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToolProvider from "./context/ToolContext";
import ShapesHandler from "./components/ShapesHandler";
import Activation from "./components/Activation";

function App() {
  return (
    <ToolProvider>
      <Router>
        <div className="App">
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <MainCanvas />
                  <ShapesHandler />
                </>
              }
            />
            <Route path="/activation" element={<Activation />} />
          </Routes>
        </div>
      </Router>
    </ToolProvider>
  );
}

export default App;
