import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

/**
 * Creates a new user with the given email, password, first name, and last name.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @param firstName - The first name of the user.
 * @param lastName - The last name of the user.
 * @returns The newly created user.
 */
export const createUser = async (email, password, firstName, lastName) => {
  const hashedPassword = await hashPassword(password);

  const newUser = User.create({
    email,
    password: hashedPassword,
    name: `${firstName} ${lastName}`,
  });
  return newUser;
};

/**
 * Gets the user with the given email.
 * @param email - The email of the user.
 * @returns The user with the given email.
 */
export const getUser = async (email) => await User.findOne({ email });

/**
 * Checks if the given password matches the hashed password in the database.
 * @param password - The password to check.
 * @param user - The user object from the database.
 * @returns True if the password matches, false otherwise.
 */
export const checkPassword = (password, user) =>
  bcrypt.compare(password, user?.password);

/**
 * Creates a JWT token for the given user.
 * @param email - The email of the user.
 * @param id - The id of the user.
 * @returns A JWT token.
 */
export const createToken = (email, id) =>
  jwt.sign({ email, id }, "supersecrettest", { expiresIn: "1h" });

/**
 * Hash a password using bcrypt.
 * @param password - The password to hash.
 * @returns The hashed password.
 */
const hashPassword = (password) => bcrypt.hash(password, 12);
