import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import InventLogo from "../assets/image/invent/invent-logo.png";
import Axios from "axios";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  bgContainer: {
    background: "#ffffff",
    paddingLeft: 0,
    paddingRight: 0,
  },
  bgAppbar: {
    background: "#ffffff",
    height: "100vh",
  },
  content: {
    paddingTop: "30%",
  },
  imgInvent: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    width: "50%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "96%",
  },
  form: {
    marginTop: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function LoginPages() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const auth = JSON.parse(localStorage.getItem("auth"));

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAuth, setIsAuth] = React.useState(
    auth !== undefined && auth !== null && auth.isAuth === true ? true : false
  );

  useEffect(() => {}, [isAuth]);

  const handleLogin = () => {
    login();
  };

  const login = () => {
    const param = {
      employee_id: username,
      password: password,
    };

    let header = { "Content-Type": "application/json" };

    Axios.post(
      "https://invent-integrasi.co.id/lib/api/login_employee",
      JSON.stringify(param),
      {
        headers: header,
      }
    )
      .then((res) => {
        console.log(res.data);
        if (res.data.STATUS === "FETCH_DATA_SUCCESS") {
          setIsAuth(true);
          const auth = {
            isAuth: true,
            employeeID: username,
          };
          localStorage.setItem("auth", JSON.stringify(auth));
          window.location = "/";
        } else {
          enqueueSnackbar("Login gagal!", { variant: "error" });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: "error" });
        window.location = "/login";
      });
  };
  console.log(isAuth);
  if (isAuth) {
    return <Redirect to={"/"} />;
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.bgContainer}>
        <Grid item xs={12} className={classes.bgAppbar}>
          <div className={classes.content}>
            <img src={InventLogo} alt="Logo" className={classes.imgInvent} />
            <Grid item xs={12}>
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                className={classes.form}
              >
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="employee-id"
                    label="Employee ID"
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleLogin}
                  >
                    Absen Masuk
                  </Button>
                </FormControl>
              </form>
            </Grid>
          </div>
        </Grid>
      </Container>
    </>
  );
}

export default LoginPages;
