import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { errorMessage } from "../Helper/Message";

export const PrivateRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props => {
      let userObjString = localStorage.getItem("userObjLogin");
      if (!userObjString && !auth) {
        errorMessage("Please Login First");
      }
      return auth ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/signin" />
      );
    }}
  />
);

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(PrivateRoute);
