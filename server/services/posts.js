import mongoose from "mongoose";

import PostMessage from "../models/post-message.js";

export const findAllPosts = async () => {
  const allPosts = await PostMessage.find();
  return allPosts;
};

export const createNewPost = async (post) => {
  const newPost = new PostMessage(post);
  await newPost.save();
};

export const findAndUpdatePost = async (id, post) => {
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { ...post, id },
    { new: true }
  );
  return updatedPost;
};

export const findAndDeletePost = async (id) => {
  const postToDelete = await PostMessage.findByIdAndRemove(id);
  return postToDelete;
};

export const findAndLikePost = async (id) => {
  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  return updatedPost;
};
