import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin } from "../../Features/authSlice";

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    console.log("userData: ", userData);

    dispatch(signin(userData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              size="medium"
              type="email"
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              size="medium"
              type="password"
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="styledButton w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: "0.8rem 0" }}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="pb-0 pt-4 flex items-center">
          <p className="text-sm sm:text-normal">
            If you don't have an account ?
          </p>
          <Button
            onClick={() => navigate("/signup")}
            className="ml-5"
            size="small"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
