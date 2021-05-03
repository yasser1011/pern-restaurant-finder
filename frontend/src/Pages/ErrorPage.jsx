import React from "react";
import Navbar from "../Components/Navbar";

const ErrorPage = ({ history }) => {
  return (
    <div>
      <Navbar history={history} />
      <h1>404 Page Not Found</h1>
    </div>
  );
};

export default ErrorPage;
