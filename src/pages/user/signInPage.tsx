import React from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "@/redux/reducers";
import { signIn } from "../../redux/user/userActions";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MUILink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

import { FaGoogle, FaFacebook } from "react-icons/fa";
import mainRequest from "../../api/mainRequest";
import GoogleLogin from "@leecheuk/react-google-login";
import axios from "axios";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MUILink color="inherit" href="#">
        Your Website
      </MUILink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();
const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const user = useSelector((state: RootState) => state.user); // Get the current user state
  React.useEffect(() => {
    //로그인이 성공하면 메인페이지로 이동
    if (user.isLoggedIn) {
      navigate("/");
    }
  }, [user.isLoggedIn, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };

    console.log("signin-handleSubmit메서드 작동");
    console.log("userData:", userData);
    await dispatch(signIn(userData));
    console.log("user.isLoggedIn:", user.isLoggedIn);
  };

  // const handleGoogleLogin = async () => {
  // };
  
  // const handleFacebookLogin = () => {
  // };
  
  // const handleNaverLogin =async () => {
  // };



  return (
    // <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          // noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <MUILink href="#" variant="body2">
                Forgot password?
              </MUILink>
            </Grid>
            <Grid item>
              <MUILink href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </MUILink>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "300px",
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FaGoogle />}
          sx={{ mt: 2, mb: 1 }}
          onClick={handleGoogleLogin}
        >
          구글 로그인
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<FaFacebook />}
          sx={{ mt: 2, mb: 1 }}
          onClick={handleFacebookLogin}
        >
          페이스북 로그인
        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2, mb: 1 }}
          startIcon={
            <img
              src={`/images/naver_logo.png`}
              alt="Naver"
              style={{ width: "24px", height: "24px" }}
            />
          }
          onClick={handleNaverLogin}
        >
          네이버 로그인
        </Button>
      </Box> */}

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
    // </ThemeProvider>
  );
};

export default SignInPage;
