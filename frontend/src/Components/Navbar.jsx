import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
  },
}));

export default function Navbar({ history }) {
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData({ token: null, user: null });
    localStorage.setItem("auth-token", "");
    history.push("/login");
  };

  const login = () => {
    history.push("/login");
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.flex}>
          <Typography variant="h6" className={classes.title}>
            {userData.token && userData.user.username}
          </Typography>
          {userData.token == null ? (
            <Button onClick={login} variant="contained">
              Login
            </Button>
          ) : (
            <Button onClick={logout} variant="contained" color="secondary">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
