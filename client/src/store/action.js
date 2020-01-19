import {
  database
} from "../Helper/Firebase";

export const setVideos = videos => {
  return {
    type: "SET_VIDEOS",
    videos
  };
};

export const setAuth = user => {
  return {
    type: "SET_AUTH",
    user
  };
};

export const setAdmin = _ => {
  return {
    type: "SET_ADMIN"
  };
};

export const signOut = _ => {
  return {
    type: "SIGNOUT"
  };
};

export const startLoading = _ => {
  return {
    type: "START_LOADING"
  };
};
export const stopLoading = _ => {
  return {
    type: "STOP_LOADING"
  };
};

export const updateVideos = () => dispatch => {
  let videos = [];
  database.ref("videos").once("value").then(snapshot => {
    snapshot.forEach(function (childSnapshot) {
      var video = childSnapshot.val();
      videos.push(video);
    });
    console.log(videos)
    return dispatch({
      type: "UPDATE_VIDEOS",
      videos
    })
  });
};