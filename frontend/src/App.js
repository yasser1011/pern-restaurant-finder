import { useContext } from "react";
import { UserContext } from "./Context/UserContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import AddRestaurant from "./Pages/AddRestaurant";
import RestaurantDetails from "./Pages/RestaurantDetails";
import EditRstaurant from "./Pages/EditRestaurant";
import ErrorPage from "./Pages/ErrorPage";
import "./App.css";

function App() {
  const { userLoading } = useContext(UserContext);

  if (userLoading) {
    return (
      <div className="App">
        {/* <h1>Loading..</h1> */}
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/Restaurant/add" component={AddRestaurant} />
          <Route exact path="/Restaurant/:id" component={RestaurantDetails} />
          <Route exact path="/Restaurant/Edit/:id" component={EditRstaurant} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
