import React, { useContext, useState } from "react";
import RestaurantForm from "../Components/RestaurantForm";
import { UserContext } from "../Context/UserContext";
import Navbar from "../Components/Navbar";
import { useForm } from "../CustomHooks/useForm";
import { apiUrl } from "../apiUrl";

const AddRestaurant = ({ history }) => {
  const { userData } = useContext(UserContext);

  //cant use the useForm because no e.target.value in setting the image
  const [restaurant, setRestaurant] = useState({
    name: "",
    location: "",
    price_range: "",
    image: "",
  });

  const fullUrl = `${apiUrl}/restaurants/register`;

  if (!userData.token || (userData.token && userData.user.role !== "admin")) {
    return (
      <div>
        <Navbar history={history} />
        <h1>Not Allowed</h1>
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
        action="add"
        history={history}
      />
    </div>
  );
};

export default AddRestaurant;
