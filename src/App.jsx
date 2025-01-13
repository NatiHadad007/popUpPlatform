import React, { useContext } from "react";
import "./App.css";
import Nav from "./components/Nav";
import MainCanvas from "./components/MainTable";
import { ToolContext } from "./context/ToolContext";
import { BrowserRouter as Router } from "react-router-dom";
import ToolProvider from "./context/ToolContext";
import CanvasSizeEditor from "./components/CanvasSizeEditor";
function App() {
  const clickOutSide = () => {
    // console.log("clicked");
    // shapeSelected(null);
  };

  return (
    <>
      <ToolProvider>
        <Router>
          <div className="App" onClick={clickOutSide}>
            <Nav />
            <MainCanvas />
            <CanvasSizeEditor />
          </div>
        </Router>
      </ToolProvider>
    </>
  );
}

export default App;
