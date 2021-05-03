import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Alert from "@material-ui/lab/Alert";
import FileBase from "react-file-base64";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    height: "550px",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));

const RestaurantForm = ({
  restaurant,
  setRestaurant,
  fullUrl,
  action,
  history,
}) => {
  console.log(restaurant);
  const classes = useStyles();

  const [notificationMsg, setNotificationMsg] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  const clear = () => {
    setRestaurant({
      name: "",
      location: "",
      price_range: "",
      image: "",
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      token = "";
    }
    try {
      const RestaurantRes = await axios.post(fullUrl, restaurant, {
        headers: { "x-auth-token": token },
      });
      setNotificationMsg(RestaurantRes.data);
      clear();
      setTimeout(() => {
        setNotificationMsg("");
        if (action === "edit") history.push("/");
      }, 1000);
      setSaveLoading(false);
    } catch (error) {
      console.log(error);
      setNotificationMsg(error);
      setTimeout(() => {
        setNotificationMsg("");
      }, 2000);
      setSaveLoading(false);
    }
  };

  return (
    <div className={classes.center}>
      <Container maxWidth="md">
        <Link to="/">
          <Button variant="contained" color="primary" size="medium">
            Back Home
          </Button>
        </Link>
        {notificationMsg ? (
          <Alert severity="info">{notificationMsg}</Alert>
        ) : null}
        <Paper className={classes.paper}>
          <form
            autoComplete="off"
            noValidate
            className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}
          >
            <Typography variant="h5">
              {action === "edit" ? "Edit" : "Add"} Restaurant
            </Typography>
            <TextField
              name="name"
              value={restaurant.name}
              onChange={handleChange}
              variant="outlined"
              label="Name"
              fullWidth
            />
            <TextField
              name="location"
              value={restaurant.location}
              onChange={handleChange}
              variant="outlined"
              label="Location"
              fullWidth
            />
            <InputLabel id="demo-simple-select">Price Range</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="price_range"
              value={restaurant.price_range}
              onChange={handleChange}
            >
              <MenuItem selected value={1}>
                $
              </MenuItem>
              <MenuItem value={2}>$$</MenuItem>
              <MenuItem value={3}>$$$</MenuItem>
              <MenuItem value={4}>$$$$</MenuItem>
              <MenuItem value={5}>$$$$$</MenuItem>
            </Select>
            <div className={classes.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setRestaurant({ ...restaurant, image: base64 })
                }
              />
            </div>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
              disabled={
                saveLoading ||
                !restaurant.image ||
                !restaurant.location ||
                !restaurant.name ||
                !restaurant.price_range
              }
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              fullWidth
              onClick={clear}
            >
              Clear
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default RestaurantForm;
