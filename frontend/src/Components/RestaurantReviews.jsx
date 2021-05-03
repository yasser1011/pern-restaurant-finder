import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 275,
    minHeight: 175,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 2,
  },
}));

const RestaurantReviews = ({ reviews }) => {
  const classes = useStyles();
  return (
    <>
      <h3>Other Reviews</h3>
      <div className="cards">
        {reviews.map((review) => {
          return (
            <Card key={review.id} className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {review.username}
                </Typography>
                <Typography variant="h5" component="h2">
                  {review.review}
                </Typography>
                <br />

                <Typography className={classes.pos} color="textSecondary">
                  Rating
                </Typography>
                <Box component="fieldset" mb={1} borderColor="transparent">
                  <Rating name="disabled" value={review.rating} disabled />
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantReviews;
