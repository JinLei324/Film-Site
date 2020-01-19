import { database, storage } from "./Firebase";
import _ from "lodash";

export const getAllPendingVideosWithUsers = () => {
  let videos = [];
  var leadsRef = database.ref("videos");
  return leadsRef.once("value").then(snapshot => {
    snapshot.forEach(function(childSnapshot) {
      var video = childSnapshot.val();
      videos.push(video);
    });
    videos = _.remove(videos, function(video) {
      return !video.allowed;
    });
    return videos;
  });
};

export const getAllVideos = () => {
  let videos = [];
  var leadsRef = database.ref("videos");
  return leadsRef.once("value").then(snapshot => {
    snapshot.forEach(function(childSnapshot) {
      var video = childSnapshot.val();
      videos.push(video);
    });
    return videos;
  });
};

export const getSingleVideo = videoId => {
  let video = {};
  var leadsRef = database.ref(`videos/${videoId}`);
  return leadsRef.once("value").then(snapshot => {
    video = snapshot.val();
    return video;
  });
};

export const removeVideoFromEverywhere = videoObj => {
  return removeVideoFromFeature(videoObj.videoId)
    .then(() => {
      return removeVideoPosterFromStorage(videoObj.posterStorageRef);
    })
    .then(() => {
      return removeVideoFromStorage(videoObj.videoStorageRef);
    })
    .then(() => {
      if (videoObj.series) {
        return removeVideoFromDB(videoObj.videoId).then(() => {
          return removeFromSeries(
            videoObj.userId,
            videoObj.seriesId,
            videoObj.videoId
          );
        });
      } else {
        return removeVideoFromDB(videoObj.videoId);
      }
    });
};

export const removeVideoFromFeature = videoId => {
  return database.ref(`admin/featured/${videoId}`).remove();
};

export const removeVideoFromStorage = videoStorageRef => {
  return storage.ref(videoStorageRef).delete();
};

export const removeVideoPosterFromStorage = posterStorageRef => {
  return storage.ref(posterStorageRef).delete();
};
export const removeVideoFromDB = videoId => {
  return database.ref(`videos/${videoId}`).remove();
};

export const disableVideo = videoId => {
  return removeVideoFromFeature(videoId).then(() => {
    return database.ref(`videos/${videoId}`).update({
      allowed: false,
      disabled: true,
      hide: false
    });
  });
};

export const hideVideo = videoId => {
  return database.ref(`videos/${videoId}`).update({
    allowed: false,
    disabled: false,
    hide: true
  });
};

export const getSeriesArr = userId => {
  return database.ref(`series/${userId}`).once("value");
};

export const removeFromSeries = (userId, seriesId, videoId) => {
  return database
    .ref(`series/${userId}/${seriesId}`)
    .once("value")
    .then(seriesSnap => {
      let series = seriesSnap.val();
      let seriesVideos = JSON.parse(series.videos);
      seriesVideos = seriesVideos.filter(
        videoIdFromSeries => videoIdFromSeries !== videoId
      );
      if (seriesVideos.length === 0) {
        return database.ref(`series/${userId}/${seriesId}`).remove();
      } else {
        return database.ref(`series/${userId}/${seriesId}`).update({
          videos: JSON.stringify(seriesVideos)
        });
      }
    });
};
export function urltoFile(url, filename, mimeType) {
  return fetch(url)
    .then(function(res) {
      return res.arrayBuffer();
    })
    .then(function(buf) {
      return new File([buf], filename, { type: mimeType });
    });
}
