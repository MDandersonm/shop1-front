import React from "react";
import { useState } from "react";
import { ChangeEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import { signUp } from "../../redux/user/userActions";

import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "@/redux/reducers";
import { useNavigate } from "react-router-dom";
import { FormHelperText } from "@mui/material";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const [isChecked, setIsChecked] = useState(false);

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmValid, setConfirmValid] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      username: data.get("username") as string,
    };
    console.log("signup-handleSubmit메서드 작동");
    dispatch(signUp(userData, navigate));
  };
  // console.log({
  //   email: data.get("email"),
  //   password: data.get("password"),
  // });

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const checkEmailValidity = (email: string) => {
    if (emailRegex.test(email)) {
      setEmailValid(true);
      setEmailError(null);
    } else {
      setEmailValid(false);
      setEmailError("이메일 형식에 맞지 않습니다.");
    }
  };
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const checkPasswordValidity = (password: string) => {
    if (passwordRegex.test(password)) {
      setPasswordValid(true);
      setPasswordError(null);
    } else {
      setPasswordValid(false);
      setPasswordError(
        "패스워드는 영어, 숫자, 특수문자로 구성되어야 하며 8자 이상이어야 합니다."
      );
    }
  };

  const checkConfirmValidity = (password: string, confirm: string) => {
    if (password === confirm) {
      setConfirmValid(true);
      setConfirmError(null);
    } else {
      setConfirmValid(false);
      setConfirmError("패스워드가 일치하지 않습니다.");
    }
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Checkbox changed:", event.target.checked); // 이 로그가 제대로 출력되는지 확인
    setIsChecked(event.target.checked);
    setTermsAccepted(event.target.checked);
  };

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
          Sign up
        </Typography>
        <Box
          component="form"
          // noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="Nick Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={5}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ height: 50 }}
                // TODO: 이메일 인증 함수 추가
                onClick={() => {}}
              >
                Verify Email
              </Button>
            </Grid>

            <Grid item xs={7}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => checkEmailValidity(e.target.value)}
              />
              {emailError && (
                <FormHelperText error>{emailError}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={5}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ height: 50 }}
                // TODO: 이메일 인증 함수 추가
                onClick={() => {}}
              >
                Verify Email
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => checkPasswordValidity(e.target.value)}
              />
              {passwordError && (
                <FormHelperText error>{passwordError}</FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                onChange={(e) => {
                  checkConfirmValidity(
                    (document.getElementById("password") as HTMLInputElement)
                      .value,
                    e.target.value
                  );
                }}
              />
              {confirmError && (
                <FormHelperText error>{confirmError}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={handleTermsChange}
                    color="primary"
                  />
                }
                label={
                  <span style={{ color: isChecked ? "black" : "gray" }}>
                    서비스 이용약관 동의
                  </span>
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={
              !(emailValid && passwordValid && confirmValid && termsAccepted)
            }
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    // </ThemeProvider>
  );
};
