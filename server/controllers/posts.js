import {
  findAllPosts,
  createNewPost,
  findAndUpdatePost,
  findAndDeletePost,
  findAndLikePost,
} from "../services/posts.js";

/**
 * Returns all the posts in the database.
 * @param req - The request object.
 * @param res - The response object.
 */
export const getPosts = async (req, res) => {
  try {
    const postMessages = await findAllPosts();
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Creates a new post and returns it.
 * @param post - The post to create.
 * @param creator - The user that created the post.
 */
export const createPost = async (req, res) => {
  const post = req.body;
  const creator = req.userId;
  try {
    const newPost = await createNewPost(post, creator);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/**
 * Updates a post with the given ID with the given post.
 * @param req - The request object.
 * @param res - The response object.
 */
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!id) return res.status(404).send("No post with that ID exists");

  const updatedPost = await findAndUpdatePost(id, post);

  res.json(updatedPost);
};

/**
 * Deletes a post from the database.
 * @param req - The request object.
 * @param res - The response object.
 */
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).send("No post with that ID exists");

  await findAndDeletePost(id);

  res.json({ message: "Post deleted succesfully" });
};

/**
 * Like a post.
 * @param req - The request object.
 * @param res - The response object.
 * @returns None
 */
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: " Not authenticated" });
  if (!id) return res.status(404).send("No post with that ID exists");

  const updatedPost = await findAndLikePost(id);

  res.json(updatedPost);
};
