import React, { useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { apiUrl } from "../apiUrl";
import AdminRestaurantActionBtns from "./AdminRestaurantActionBtns";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    height: 500,
    marginBottom: 40,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
  cardActions: {
    display: "flex",
    margin: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Restaurant = ({ restaurant, setRestaurants, setFilteredRestaurants }) => {
  const classes = useStyles();

  const { userData } = useContext(UserContext);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteRestaurant = async () => {
    setDeleteLoading(true);
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      token = "";
    }
    try {
      const deleteRes = await axios.delete(
        `${apiUrl}/restaurants/delete/${restaurant.id}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      setDeleteLoading(false);
      setRestaurants((oldState) => {
        return oldState.filter((res) => res.id !== restaurant.id);
      });
      setFilteredRestaurants((oldState) => {
        return oldState.filter((res) => res.id !== restaurant.id);
      });
    } catch (error) {
      console.log(error);
      setDeleteLoading(false);
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {restaurant.name[0].toUpperCase()}
          </Avatar>
        }
        title={restaurant.name}
        subheader={restaurant.location}
      />
      <CardMedia className={classes.media} image={restaurant.image} />
      <CardContent>
        {restaurant.restaurant_id ? (
          <Box mb={3} borderColor="transparent">
            <Rating
              name="disabled"
              value={Math.round(parseFloat(restaurant.average_rating))}
              disabled
            />
            ({restaurant.count})
          </Box>
        ) : (
          "No Reviews"
        )}
        <Typography variant="body2" color="textSecondary" component="p">
          Price Range
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {"$".repeat(restaurant.price_range)}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Link to={`/Restaurant/${restaurant.id}`}>
          <Button size="small" variant="contained" color="primary">
            Details
          </Button>
        </Link>
        {userData.token && userData.user.role === "admin" && (
          <AdminRestaurantActionBtns
            deleteRestaurant={deleteRestaurant}
            deleteLoading={deleteLoading}
            restaurantId={restaurant.id}
          />
        )}
        {/* <Button
          disabled={deleteLoading}
          size="small"
          color="secondary"
          variant="contained"
          onClick={deleteRestaurant}
        >
          Delete
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default Restaurant;
