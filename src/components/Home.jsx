import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Navigation from "./Navigation";
import { PaginasApp } from "../data/PaginasApp";

export default function Home() {
  const { path, url } = useRouteMatch();
  const loggedIn =localStorage.getItem("loggedUser")
  return (
    <>
     <Navigation authorized={loggedIn} baseUrl={url} />
     <Switch>
        {PaginasApp.map((item) => {
          if (loggedIn !== null) {
            return (
              <Route
                key={item.id}
                path={`${path}/${item.path}`}
                component={item.component}
              />
            );
          }})
        }
      </Switch>
    </>
  );
}
