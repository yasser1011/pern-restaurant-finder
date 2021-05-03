import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../Components/Navbar";
import { apiUrl } from "../apiUrl";
import axios from "axios";
import ReviewForm from "../Components/ReviewForm";
import RestaurantReviews from "../Components/RestaurantReviews";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

const RestaurantDetails = ({ match, history }) => {
  const classes = useStyles();

  const id = match.params.id;

  const [restaurant, setRestaurant] = useState(null);
  const [restaurantLoading, setRestaurantLoading] = useState(true);

  const fetchRestaurant = async () => {
    try {
      const restaurantRes = await axios.get(`${apiUrl}/restaurants/${id}`);
      setRestaurant(restaurantRes.data);
      setRestaurantLoading(false);
    } catch (error) {
      console.log(error);
      setRestaurantLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  if (restaurantLoading) {
    return (
      <div>
        <Navbar history={history} /> <CircularProgress />
      </div>
    );
  }

  if (restaurant === "not found") {
    return (
      <div>
        <Navbar history={history} /> <h1>Sorry Restaurant Doesnt Exist</h1>
      </div>
    );
  }

  return (
    <div>
      <Navbar history={history} />
      <h1>Restaurant</h1>
      {restaurant && (
        <Grid container justify="center">
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {restaurant.restaurant.name[0].toUpperCase()}
                </Avatar>
              }
              title={restaurant.restaurant.name}
              subheader={restaurant.restaurant.location}
            />
            <CardMedia
              className={classes.media}
              image={restaurant.restaurant.image}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Price Range
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {"$".repeat(restaurant.restaurant.price_range)}
              </Typography>
              {restaurant.restaurant.restaurant_id ? (
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating
                    name="disabled"
                    value={Math.round(
                      parseFloat(restaurant.restaurant.average_rating)
                    )}
                    disabled
                  />
                  ({restaurant.restaurant.count})
                </Box>
              ) : (
                "No Reviews"
              )}
            </CardContent>
          </Card>
        </Grid>
      )}
      <ReviewForm
        restaurantId={restaurant.restaurant.id}
        setRestaurant={setRestaurant}
      />
      <RestaurantReviews reviews={restaurant.reviews} />
    </div>
  );
};

export default RestaurantDetails;
