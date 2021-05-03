import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Box,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import Alert from "@material-ui/lab/Alert";
import { UserContext } from "../Context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "../CustomHooks/useForm";
import { apiUrl } from "../apiUrl";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxwidth: "120rem",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
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
    // maxWidth: "120rem",
    width: "900px",

    [theme.breakpoints.down("830")]: {
      maxWidth: "20rem",
    },
  },
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    [theme.breakpoints.down("830")]: {
      flexDirection: "column",
    },
  },

  buttonSubmit: {
    marginBottom: 10,
  },
}));

const ReviewForm = ({ restaurantId, setRestaurant }) => {
  const classes = useStyles();

  const { userData } = useContext(UserContext);

  const [review, setReview] = useState({ msg: "", rating: 0 });
  const [notifMsg, setNotifMsg] = useState("");

  const clear = () => {
    setReview({ msg: "", rating: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      token = "";
    }
    const confirmedRev = {
      msg: review.msg,
      rating: review.rating,
      username: userData.user.username,
      restaurantId,
    };
    try {
      const reviewRes = await axios.post(`${apiUrl}/reviews`, confirmedRev, {
        headers: { "x-auth-token": token },
      });
      clear();
      setNotifMsg("Saved");
      setRestaurant((restaurant) => {
        return {
          ...restaurant,
          reviews: [...restaurant.reviews, reviewRes.data],
        };
      });
      setTimeout(() => {
        setNotifMsg("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setNotifMsg("Error");
      setTimeout(() => {
        setNotifMsg("");
      }, 2000);
    }
  };

  return (
    <div className={classes.container}>
      <h3>Add a Review</h3>
      {notifMsg ? <Alert severity="info">{notifMsg}</Alert> : null}
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <textarea
            placeholder="Review"
            value={review.msg}
            onChange={(e) => setReview({ ...review, msg: e.target.value })}
            rows="3"
            cols="55"
            name="msg"
          ></textarea>

          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={review.rating}
              onChange={(event, newValue) => {
                setReview({ ...review, rating: newValue });
              }}
            />
          </Box>

          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={!userData.token || !review.msg || !review.rating}
          >
            {userData.token ? "Submit" : "Login To Submit"}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default ReviewForm;
