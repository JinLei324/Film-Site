import { database } from "./Firebase";
import _ from "lodash";

export const getAllUsersEmail = () => {
  let users = [];
  var leadsRef = database.ref("users");
  return leadsRef.once("value").then(snapshot => {
    snapshot.forEach(function(childSnapshot) {
      var user = childSnapshot.val();
      user = user.email;
      users.push(user);
    });
    return users;
  });
};

export const getAllUsers = () => {
  let users = [];
  var leadsRef = database.ref("users");
  return leadsRef.once("value").then(snapshot => {
    snapshot.forEach(function(childSnapshot) {
      var user = childSnapshot.val();
      users.push(user);
    });
    return users;
  });
};

export const getAllPendingUsers = () => {
  let users = [];
  var leadsRef = database.ref("users");
  return leadsRef.once("value").then(snapshot => {
    snapshot.forEach(function(childSnapshot) {
      var user = childSnapshot.val();
      users.push(user);
    });
    users = _.remove(users, function(user) {
      return !user.allowed;
    });
    return users;
  });
};

export const getUserName = userId => {
  var leadsRef = database.ref("users");
  let userName;
  return leadsRef.once("value").then(usersSnapShot => {
    usersSnapShot.forEach(function(userChildSnapshot) {
      var user = userChildSnapshot.val();
      if (user.userId === userId) {
        userName = user.name;
      }
    });
    return userName;
  });
};

export const sendNotifications = userObj => {
  let followers = JSON.parse(userObj.followers);
  getAllUsers().then(usersArr => {
    console.log("Works");
    usersArr.forEach(user => {
      followers.forEach(followerId => {
        if (followerId === user.userId) {
          let preNotification = JSON.parse(user.notifications);
          let updatedNotifications = preNotification.concat([
            `${userObj.name} uploaded a video`
          ]);
          database
            .ref(`users/${followerId}`)
            .update({
              notifications: JSON.stringify(updatedNotifications),
              newNotification: true
            })
            .then(() => {
              console.log("Notification Has Been Send");
            });
        }
      });
    });
  });
};
