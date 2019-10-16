import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import AddNewSurvey from "./views/AddNewSurvey";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import SurveyDashboard from "./views/SurveyDashboard";
import SurveyForm from "./views/SurveyForm";
import Login from "./views/login";
import SurveyEntries from "./views/SurveyEntries";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: Login
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
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
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/survey-form",
    layout: DefaultLayout,
    component: SurveyForm
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts_old",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: SurveyDashboard
  }
];
