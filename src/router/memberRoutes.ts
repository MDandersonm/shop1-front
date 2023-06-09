import SignInPage from "../pages/memberPage/signInPage";
import {SignUpPage} from "../pages/memberPage/signUpPage";


const memberRoutes = [
  {
    path: "/sign-up",
    component: SignUpPage,
  },
  {
    path: "/sign-in",
    component: SignInPage,
  },


];

export default memberRoutes;
