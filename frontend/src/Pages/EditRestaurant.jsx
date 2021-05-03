import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import { UserContext } from "../Context/UserContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import RestaurantForm from "../Components/RestaurantForm";
import axios from "axios";
import { apiUrl } from "../apiUrl";

const EditRestaurant = ({ match, history }) => {
  const id = match.params.id;

  const { userData } = useContext(UserContext);

  const [restaurant, setRestaurant] = useState(null);
  const [restaurantLoading, setRestaurantLoading] = useState(true);

  const fullUrl = `${apiUrl}/restaurants/edit/${id}`;

  const fetchRestaurant = async () => {
    try {
      const restaurantRes = await axios.get(`${apiUrl}/restaurants/${id}`);
      setRestaurant(restaurantRes.data.restaurant);
      setRestaurantLoading(false);
    } catch (error) {
      console.log(error);
      setRestaurantLoading(false);
    }
  };

  useEffect(() => {
    if (userData.token && userData.user.role === "admin") fetchRestaurant();
  }, []);

  if (!userData.token || (userData.token && userData.user.role !== "admin")) {
    return (
      <div>
        <Navbar history={history} />
        <h1>Not Allowed</h1>
      </div>
    );
  }

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
      <RestaurantForm
        restaurant={restaurant}
        setRestaurant={setRestaurant}
        fullUrl={fullUrl}
        action="edit"
        history={history}
      />
    </div>
  );
};

export default EditRestaurant;
