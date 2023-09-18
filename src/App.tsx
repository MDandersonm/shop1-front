import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import routes from "./router/routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./router/privateRoute";

type RouteType = {
  path: string;
  component: React.FC;
  allowedRoles?: string[];
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer autoClose={3000} position="bottom-right" />
      <Routes>
        {(routes as RouteType[]).map((route) => {
          if (route.allowedRoles) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PrivateRoute allowedRoles={route.allowedRoles}>
                    <route.component />
                  </PrivateRoute>
                }
              />
            );
          } else {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            );
          }
        })}
      </Routes>
    </div>
  );
};

export default App;



// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import "./App.css";
// import routes from "./router/routes";
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';

// const App: React.FC = () => {
//   return (
//     <div className="App">
//         <Navbar/>
//         <ToastContainer autoClose={3000} position="bottom-right" />
//         <Routes>
//           {routes.map((route) => {
//             return (
//               <Route
//                 key={route.path}
//                 path={route.path}
//                 element={<route.component />}
//               />
//             );
//           })}
//         </Routes>
//     </div>
//   );
// };

// export default App;
