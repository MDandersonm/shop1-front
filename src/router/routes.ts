/* eslint-disable import/no-anonymous-default-export */

import mainRoutes from "./MainRoutes";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";
export default [
 
  ...mainRoutes,
  ...productRoutes,
  ...userRoutes,
];
