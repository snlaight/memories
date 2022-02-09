import express from "express";

import PostMessage from "../models/post-message.js";

import {
  findAllPosts,
  createNewPost,
  findAndUpdatePost,
  findAndDeletePost,
  findAndLikePost,
} from "../services/posts.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await findAllPosts();
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = await createNewPost(post);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!id) return res.status(404).send("No post with that ID exists");

  const updatedPost = await findAndUpdatePost(id, post);

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).send("No post with that ID exists");

  await findAndDeletePost(id);

  res.json({ message: "Post deleted succesfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).send("No post with that ID exists");

  const updatedPost = await findAndLikePost(id);

  res.json(updatedPost);
};
