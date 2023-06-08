import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import routes from "./router/routes";

const App: React.FC = () => {
  return (
    <div className="App">
        <Navbar/>
        <div className="container">
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
        </Routes>
        </div>
    </div>
  );
};

export default App;
