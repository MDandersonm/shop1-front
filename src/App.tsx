import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import routes from "./router/routes";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container mt-5">
        <Navbar/>
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
