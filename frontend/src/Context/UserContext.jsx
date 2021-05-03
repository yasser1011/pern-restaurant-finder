import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { apiUrl } from "../apiUrl";
import Axios from "axios";
import { useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userData, setUserData] = useState({ user: null, token: null });
  const [userLoading, setUserLoading] = useState(true);

  const fetchUser = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      //to pass the undefined error
      localStorage.setItem("auth-token", ""); //not needed
      token = "";
    }
    try {
      const tokenRes = await Axios.post(`${apiUrl}/users/tokenIsValid`, null, {
        headers: { "x-auth-token": token },
      });
      // console.log(tokenRes.data);
      if (tokenRes.data) {
        const userRes = await Axios.get(`${apiUrl}/users/getUser`, {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token: token,
          user: userRes.data.user,
        });

        setUserLoading(false);
      }
      setUserLoading(false);
    } catch (err) {
      setUserLoading(false);
      console.log(err.response.data.error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, userLoading }}>
      {props.children}
    </UserContext.Provider>
  );
};
