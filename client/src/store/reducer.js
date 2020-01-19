const initialState = {
  videos: [],
  loading: false,
  auth: false,
  admin: false,
  currentUser: {}
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VIDEOS":
      return {
        ...state,
        videos: action.videos
      };
    case "UPDATE_VIDEOS":
      return {
        ...state,
        videos: action.videos,
        loading: false,
      };
    case "SET_AUTH":
      return {
        ...state,
        auth: true,
        currentUser: action.user
      };
    case "SET_ADMIN":
      return {
        ...state,
        admin: true,
      };
    case "START_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "SIGNOUT":
      return {
        ...state,
        admin: false,
        auth: false,
      };
    default:
      return state;
  }
};

export default rootReducer;