import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

import { TextField } from "@material-ui/core";
import { useForm } from "../CustomHooks/useForm";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
    marginTop: 7,
    marginBottom: 17,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selelct: {
    marginLeft: 200,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FilterRestaurants = ({
  restaurants,
  filteredRestaurants,
  setFilteredRestaurants,
}) => {
  const classes = useStyles();

  const [filters, handleFilterChange] = useForm({ name: "", location: "" });
  const [sortByPrice, handleSortChange] = useForm({
    value: "",
  });

  const handleFilter = () => {
    if (filters.name === "" && filters.location === "") {
      setFilteredRestaurants(restaurants);
    } else if (filters.name !== "" && filters.location === "") {
      setFilteredRestaurants(
        restaurants.filter((res) =>
          res.name.toLowerCase().includes(filters.name.toLowerCase())
        )
      );
    } else if (filters.name !== "" && filters.location !== "") {
      setFilteredRestaurants(
        restaurants.filter(
          (res) =>
            res.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            res.location.toLowerCase().includes(filters.location.toLowerCase())
        )
      );
    } else {
      setFilteredRestaurants(
        restaurants.filter((res) =>
          res.location.toLowerCase().includes(filters.location.toLowerCase())
        )
      );
    }
    if (sortByPrice.value !== "") {
      handleSort();
    }
  };

  const handleSort = () => {
    if (sortByPrice.value === "1") {
      setFilteredRestaurants((fres) => {
        let copy = [...fres];
        return copy.sort((a, b) => a.price_range - b.price_range);
      });
    } else if (sortByPrice.value === "2") {
      setFilteredRestaurants((fres) => {
        let copy = [...fres];
        return copy.sort((a, b) => b.price_range - a.price_range);
      });
    } else if (sortByPrice.value === "") {
      handleFilter();
    }
  };

  useEffect(() => {
    handleFilter();
  }, [filters]);

  useEffect(() => {
    handleSort(); //handleFilter runs two times at mount
  }, [sortByPrice]);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          label="Filter by Name"
          id="filled-size-small"
          variant="filled"
          size="small"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <TextField
          label="Filter by Location"
          id="filled-size-small"
          variant="filled"
          size="small"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        />
      </div>
      <div className={classes.selelct}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="sort">Sort By Price</InputLabel>
          <Select
            native
            value={sortByPrice.value}
            onChange={handleSortChange}
            inputProps={{
              name: "value",
              id: "sort",
            }}
          >
            <option aria-label="None" value="" />
            <option value={"1"}>Low To High</option>
            <option value={"2"}>High To Low</option>
          </Select>
        </FormControl>
      </div>
    </form>
  );
};

export default FilterRestaurants;
