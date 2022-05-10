import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Navigation from "./Navigation";
import { PaginasApp } from "../data/PaginasApp";

export default function Home() {
  let { path, url } = useRouteMatch();

  return (
    <>
     <Navigation authorized={true} baseUrl={url} />
     <Switch>
        {PaginasApp.map((item) => {
          return (
            <Route
              key={item.id}
              path={`${path}/${item.path}`}
              component={item.component}
             />
          );
        })}
      </Switch>
    </>
  );
}
