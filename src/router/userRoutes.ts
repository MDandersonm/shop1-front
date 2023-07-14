import SignInPage from "../pages/user/signInPage";
import {SignUpPage} from "../pages/user/signUpPage";


const userRoutes = [
  {
    path: "/sign-up",
    component: SignUpPage,
  },
  {
    path: "/sign-in",
    component: SignInPage,
  },


];

export default userRoutes;
