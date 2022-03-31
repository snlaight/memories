import axios from "axios";

const API = axios.create({ baseUrl: "http://localhost:3001" });

API.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem("profile")).token;
  console.log(token);
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `${token.toString()}`;
  }
  return req;
});

const postAPI = "/posts";
const userAPI = "/user";

/**
 * Fetches the posts from the API.
 * @returns A promise that resolves to the posts.
 */
export const fetchPosts = () => API.get(postAPI);

/**
 * Creates a new post on the server.
 * @param newPost - The post to create.
 */
export const createPost = (newPost) => API.post(postAPI, newPost);
/**
 * Updates the post with the given id with the given updatedPost.
 * @param id - The id of the post to update.
 * @param updatedPost - The updated post.
 */
export const updatePost = (id, updatedPost) =>
  API.patch(`${postAPI}/${id}`, updatedPost);
/**
 * Deletes a post from the database.
 * @param id - The id of the post to delete.
 */
export const deletePost = (id) => API.delete(`${postAPI}/${id}`);
/**
 * Like a post.
 * @param id - The id of the post to like.
 */
export const likePost = (id) => API.patch(`${postAPI}/${id}/likePost`);

/**
 * Signs in the user with the given credentials.
 * @param formData - The form data to send to the server.
 * @returns A promise that resolves to the user's data.
 */
export const signIn = (formData) => API.post(`${userAPI}/sign-in`, formData);
/**
 * Sign up a new user.
 * @param formData - The form data to send to the server.
 */
export const signUp = (formData) => API.post(`${userAPI}/sign-up`, formData);
