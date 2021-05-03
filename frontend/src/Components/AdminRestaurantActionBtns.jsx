import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardActions: {
    display: "flex",
    marginTop: 20,
    width: "250px",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const AdminRestaurantActionBtns = ({
  deleteLoading,
  deleteRestaurant,
  restaurantId,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.cardActions}>
      <Button
        disabled={deleteLoading}
        size="small"
        color="secondary"
        variant="contained"
        onClick={deleteRestaurant}
      >
        Delete
      </Button>
      <Link to={`/Restaurant/Edit/${restaurantId}`}>
        <Button size="small" color="secondary" variant="contained">
          Edit
        </Button>
      </Link>
    </div>
  );
};

export default AdminRestaurantActionBtns;
