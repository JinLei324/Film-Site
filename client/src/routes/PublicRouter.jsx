import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

export const PublicRoute = ({ auth, component: Component, ...rest }) => (
  <Route {...rest} component={props => <Component {...props} />} />
);

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(PublicRoute);
