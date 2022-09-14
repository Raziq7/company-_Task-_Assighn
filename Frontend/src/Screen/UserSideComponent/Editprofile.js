import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  EditFormDetailsAction,
  userFindProfileAction,
} from "../../action/userAction";

function Editprofile() {
  let { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [passErr, setPassErr] = useState(false);
  const [submitErr, setSubmitErr] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userFind } = useSelector((state) => {
    return state.userFindProfile;
  });

  useEffect(() => {
    dispatch(userFindProfileAction(id));
  }, []);

  useEffect(() => {
    if (userFind) {
      setName(userFind.name);
      setEmail(userFind.email);
      setPassword(userFind.password);
    }
  }, [userFind]);

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name,
      email,
      password,
      newPassword,
    };
    if (passErr === true) {
      setSubmitErr(true);
    } else {
      setSubmitErr(false);
      dispatch(EditFormDetailsAction(obj));
      navigate("/userHome");
    }
  };
  return (
    <Container
      boxShadow={3}
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        height: "auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "#1565C0", fontWeight: "bold", mt: "10px" }}
      >
        Edit Form
      </Typography>
      <Box>
        <Grid container component="main">
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />

            <TextField
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            />
            <p style={{ color: "red" }}>
              {passErr && "Password is not correct"}
            </p>

            <p style={{ color: "red" }}>
              {submitErr && "Plese Enter Correct Password"}
            </p>

            <TextField
              margin="normal"
              onChange={(event) => {
                if (password !== event.target.value) {
                  setPassErr(true);
                } else {
                  setPassErr(false);
                }
              }}
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="password"
              id="password"
              autoFocus
            />

            <TextField
              margin="normal"
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="password"
              autoFocus
              autocomplete
            />

            <Container
              boxShadow={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginRight: "10px", textAlign: "center" }}
                >
                  Submit
                </Button>
                <Link to="/userHome">
                  <Button
                    variant="contained"
                    color="error"
                    style={{ textAlign: "center" }}
                  >
                    Cancel
                  </Button>
                </Link>
                <Box sx={{marginTop:"10px"}}></Box>
              </Box>
            </Container>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
}

export default Editprofile;
