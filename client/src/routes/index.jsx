import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Router, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import Home from "../components/Home/Home";
import RecentVideos from "../components/RecentVideos/RecentVideos";
import Navbar from "../components/Navbar/Navbar";
import Signup from "../components/Signup/Signup";
import Signin from "../components/Signin/Signin";
import VideoUpload from "../components/VideoUpload/VideoUpload";
import VideoPlay from "../components/VideoPlay/VideoPlay";
import FooterComponent from "../components/Footer/Footer";
import ContactUs from "../components/ContactUs/ContactUs";
import Category from "../components/Category/Category";
import Admin from "../components/Admin/Admin";
import AccountRequest from "../components/AccountRequest/AccountRequest";
import VideoRequest from "../components/VideoRequest/VideoRequest";
import UserAccountComponent from "../components/UserAccountComponent/UserAccountComponent";
import VideoPosterChange from "../components/VideoPosterChange/VideoPosterChange";
import FeaturedVideo from "../components/FeaturedVideo/FeaturedVideo";
import UserInfo from "../components/UserInfo/UserInfo";
import Messages from "../components/Messages/Messages";
import Notifications from "../components/Notifications/Notifications";
import CategoryResult from "../components/CategoryResult/CategoryResult";
import SeriesVideos from "../components/SeriesVideos/SeriesVideos";
import PublicRoute from "./PublicRouter";
import PrivateRoute from "./PrivateRouter";
import AdminRoute from "./AdminRouter";
import Message from "../components/Messages/Message";

const history = createBrowserHistory();

export default () => (
  <Router history={history}>
    <div>
      <Navbar />
      <Switch>
        <PublicRoute path="/message" component={Message} />
        <PublicRoute path="/" exact component={Home} />
        <PublicRoute path="/signup" component={Signup} />
        <PublicRoute path="/recent" component={RecentVideos} />
        <PublicRoute path="/play/:id" component={VideoPlay} />
        <PublicRoute path="/contact" component={ContactUs} />
        <PublicRoute path="/category" component={Category} />
        <PublicRoute path="/all/:value" component={CategoryResult} />
        <PublicRoute path="/signin" component={Signin} />
        <PublicRoute path="/user/info/:id" component={UserInfo} />
        <PublicRoute path="/series/videos/:user/:id" component={SeriesVideos} />
        <PrivateRoute path="/upload" component={VideoUpload} />
        <PublicRoute path="/user/account" component={UserAccountComponent} />
        <PublicRoute path="/user/messages" component={Messages} />
        <PrivateRoute path="/user/notifications" component={Notifications} />
        <AdminRoute path="/admin" exact component={Admin} />
        <AdminRoute path="/admin/accounts" component={AccountRequest} />
        <AdminRoute path="/admin/videos" component={VideoRequest} />
        <AdminRoute path="/admin/poster" component={VideoPosterChange} />
        <AdminRoute path="/admin/featured" component={FeaturedVideo} />
      </Switch>
      <FooterComponent />
    </div>
  </Router>
);
