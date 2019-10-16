import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "./App.css";

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      {routes.map((route, index) => {
        const noNavbar = route.path === "/login" || route.path === "/logout" || route.path === "/register" ||
          route.path === "/survey-form" ? true : false;
        const noSidebar = route.path === "/login" || route.path === "/logout" || route.path === "/register" ||
          route.path === "/survey-form" ? true : false;
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={withTracker(props => {
              return (
                <route.layout {...props} noNavbar={noNavbar} noSidebar={noSidebar} >
                  <route.component {...props} />
                </route.layout>
              );
            })}
          />
        );
      })}
    </div>
  </Router>
);
