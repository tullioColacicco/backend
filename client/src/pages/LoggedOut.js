import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

export default function LoggedOut({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  // console.log(rest);
  return (
    <Route
      {...rest}
      render={props => (!user ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
}
