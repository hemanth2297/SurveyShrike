import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views

import AddNewSurvey from "./views/AddNewSurvey";
import Errors from "./views/Errors";
import SurveyDashboard from "./views/SurveyDashboard";
import SurveyForm from "./views/SurveyForm";
import Login from "./views/login";
import Logout from "./views/logout";
import Register from './views/Register';
import SurveyEntries from "./views/SurveyEntries";
import UserSurveyDashoard from './views/UserSurveyDashoard';

export default [

  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: Login
  },

  {
    path: "/logout",
    layout: DefaultLayout,
    component: Logout
  },
  {
    path: "/register",
    layout: DefaultLayout,
    component: Register
  },
  {
    path: "/add-new-survey",
    layout: DefaultLayout,
    component: AddNewSurvey
  },
  {
    path: "/survey-entries",
    layout: DefaultLayout,
    component: SurveyEntries
  },
  {
    path: "/sessionExpired",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/survey-form",
    layout: DefaultLayout,
    component: SurveyForm
  },
  {
    path: "/all-surveys",
    layout: DefaultLayout,
    component: SurveyDashboard
  },
  {
    path: "/user-surveys",
    layout: DefaultLayout,
    component: UserSurveyDashoard
  }
];
