import * as React from "react";
import { Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import { useSnackbar } from "notistack";

import InventLogo from "../assets/image/invent/invent-logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  bgContainer: {
    background: "blue",
    paddingLeft: 0,
    paddingRight: 0,
  },
  bgAppbar: {
    background: "#ffffff",
    height: "100vh",
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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AbsensiPages() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  let auth = JSON.parse(localStorage.getItem("auth"));

  if (auth === undefined || auth === null) {
    auth = {
      isAuth: false,
      employeeID: "",
    };
    localStorage.setItem("auth", JSON.stringify(auth));
  }

  const [typeAbsen, setTypeAbsen] = React.useState("");
  const [note, setNote] = React.useState("");

  const handleAbsen = () => {
    absen();
  };

  const absen = () => {
    const param = {
      employee_id: auth.employeeID,
      type_absen: typeAbsen,
      note: note,
    };

    let header = { "Content-Type": "application/json" };

    console.log(param);

    if (typeAbsen === "") {
      enqueueSnackbar("Isi tipe absen dahulu!", { variant: "error" });
    }

    Axios.post(
      "https://invent-integrasi.co.id/lib/api/insert_update_absen",
      JSON.stringify(param),
      {
        headers: header,
      }
    )
      .then((res) => {
        if (res.data.STATUS === "SUBMIT_SUCCESS") {
          enqueueSnackbar("Absensi Sukses!", { variant: "success" });
          localStorage.removeItem("auth");
          window.location = "/";
        } else {
          enqueueSnackbar("Absensi Gagal!", { variant: "error" });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Absensi gagal!", { variant: "error" });
      });
  };

  if (auth === undefined || auth.isAuth === false) {
    return <Redirect to={"/login"} />;
  }
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.bgContainer}>
        <Grid item xs={12} className={classes.bgAppbar}>
          <AppBar position="static" style={{ backgroundColor: "#7c1819" }}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <HomeIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Absensi Invent
              </Typography>
            </Toolbar>
          </AppBar>
          <img src={InventLogo} alt="Logo" className={classes.imgInvent} />
          <Grid item xs={12}>
            <form className={classes.root} noValidate autoComplete="off">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Pilih Tipe Absen
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={typeAbsen}
                  onChange={(e) => setTypeAbsen(e.target.value)}
                  label="Tipe Absen"
                >
                  <MenuItem value={"WFH"}>WFH</MenuItem>
                  <MenuItem value={"Kantor"}>Kantor</MenuItem>
                  <MenuItem value={"Meeting"}>Meeting</MenuItem>
                  <MenuItem value={"Sakit"}>Sakit</MenuItem>
                  <MenuItem value={"Ijin"}>Ijin</MenuItem>
                  <MenuItem value={"Cuti"}>Cuti</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  id="outlined-basic"
                  label="Note"
                  variant="outlined"
                  onChange={(e) => setNote(e.target.value)}
                />
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleAbsen}
                >
                  Absen Masuk
                </Button>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AbsensiPages;
