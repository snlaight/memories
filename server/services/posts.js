import mongoose from "mongoose";
import PostMessage from "../models/post-message.js";

/**
 * Finds all posts in the database.
 * @returns A list of all posts in the database.
 */
export const findAllPosts = async () => {
  const allPosts = await PostMessage.find();
  return allPosts;
};

/**
 * Creates a new post in the database.
 * @param post - The post to create.
 * @param creator - The user who created the post.
 * @returns The newly created post.
 */
export const createNewPost = async (post, creator) => {
  const createdAt = new Date().toISOString();
  const newPost = new PostMessage({ ...post, creator, createdAt });
  await newPost.save();
  return newPost;
};

/**
 * Finds a post by id and updates it with the given post.
 * @param id - The id of the post to update.
 * @param post - The post to update the post with.
 * @returns The updated post.
 */
export const findAndUpdatePost = async (id, post) => {
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { ...post, id },
    { new: true }
  );
  return updatedPost;
};

/**
 * Finds and deletes a post from the database.
 * @param id - The id of the post to delete.
 * @returns The deleted post.
 */
export const findAndDeletePost = async (id) => {
  const postToDelete = await PostMessage.findByIdAndRemove(id);
  return postToDelete;
};

/**
 * Finds a post by id and updates it with the current user's like.
 * @param id - The id of the post to like.
 * @returns The updated post.
 */
export const findAndLikePost = async (id) => {
  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((userId) => userId === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((userId) => userId !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  return updatedPost;
};
