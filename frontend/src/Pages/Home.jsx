import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, CircularProgress } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Navbar from "../Components/Navbar";
import { UserContext } from "../Context/UserContext";
import Restaurant from "../Components/Restaurant";
import FilterRestaurants from "../Components/FilterRestaurants";
import axios from "axios";
import { apiUrl } from "../apiUrl";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Home = ({ history }) => {
  const classes = useStyles();

  const { userData } = useContext(UserContext);

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const restaurantsRes = await axios.get(`${apiUrl}/restaurants`);
      setRestaurants(restaurantsRes.data);
      setRestaurantsLoading(false);
    } catch (error) {
      console.log(error);
      setRestaurantsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (restaurantsLoading) {
    return (
      <div>
        <Navbar history={history} />
        <h1>Home</h1>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Navbar history={history} />
      <h1>Home</h1>
      {userData.user && userData.user.role === "admin" && (
        <Link to="/Restaurant/add">
          <Button size="medium" color="primary" variant="contained">
            Add New Restaurant
          </Button>
        </Link>
      )}
      <FilterRestaurants
        restaurants={restaurants}
        filteredRestaurants={filteredRestaurants}
        setFilteredRestaurants={setFilteredRestaurants}
      />
      <Container>
        <div className="cards">
          {filteredRestaurants.map((restaurant) => (
            <Restaurant
              key={restaurant.id}
              restaurant={restaurant}
              setRestaurants={setRestaurants}
              setFilteredRestaurants={setFilteredRestaurants}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
