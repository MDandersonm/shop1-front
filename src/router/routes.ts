/* eslint-disable import/no-anonymous-default-export */

import mainRoutes from "./MainRoutes";
import productRoutes from "./productRoutes";
import memberRoutes from "./memberRoutes";
export default [
 
  ...mainRoutes,
  ...productRoutes,
  ...memberRoutes,
];
