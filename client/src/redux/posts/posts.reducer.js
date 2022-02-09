import PostActionTypes from "./posts.types";

const postReducer = (posts = [], action) => {
  switch (action.type) {
    case PostActionTypes.FETCH_ALL:
      return action.payload;
    case PostActionTypes.CREATE_POST:
      return [...posts, action.payload];
    case PostActionTypes.LIKE_POST:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case PostActionTypes.UPDATE_POST:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case PostActionTypes.DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default postReducer;
