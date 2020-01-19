import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export const AdminRoute = ({ admin, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      admin === true ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

const mapStateToProps = state => {
  return {
    admin: state.admin
  };
};

export default connect(mapStateToProps)(AdminRoute);
