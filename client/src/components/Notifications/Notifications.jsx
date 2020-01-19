import React, { Component } from "react";
import { connect } from "react-redux";
import { database } from "../../Helper/Firebase";
import { setAuth } from "../../store/action";
import { Empty } from "antd";

class Notifications extends Component {
  state = {
    notifications: []
  };
  componentDidMount() {
    let notifications = JSON.parse(this.props.user.notifications);
    this.setState({
      notifications
    });
    database.ref(`users/${this.props.user.userId}`).update({
      newNotification: false
    });
    this.props.setAuth({
      ...this.props.user,
      newNotification: false
    });
  }
  render() {
    return (
      <div className="mainNotifications mainDiv">
        <h1>All Notifications</h1>
        {this.state.notifications.length !== 0 ? (
          this.state.notifications.map((notification, i) => {
            return (
              <div className="notificationDiv" key={i}>
                {notification}
              </div>
            );
          })
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            description={<span>No Notifications</span>}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  setAuth: user => dispatch(setAuth(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
