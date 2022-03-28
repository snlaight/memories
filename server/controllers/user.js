import {
  createUser,
  getUser,
  checkPassword,
  createToken,
} from "../services/user.js";

/**
 * Takes in a user's email and password and checks if the user exists.  If so, it checks if the password is correct.  If so, it creates a token and returns it.  If not, it returns an error.
 * @param req - the request object.
 * @param res - the response object.
 */
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await getUser(email);
  try {
    if (!userExists)
      return res.status(404).json({ message: "User doesn't exist" });
    const checkUserPassword = checkPassword(password, userExists);
    if (!checkUserPassword)
      return res.status(400).json({ message: "Invalid password" });

    const token = createToken(userExists.email, userExists.id);

    res.status(200).json({ result: userExists, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Sign up a new user.
 * @param req - The request object.
 * @param res - The response object.
 */
export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const userExists = await getUser(email);
    if (userExists)
      return res.status(404).json({ message: "User already exists" });
    if (password !== confirmPassword)
      return res.status(404).json({ message: "Passwords don't match!" });

    const newUser = await createUser(email, password, firstName, lastName);
    const token = createToken(newUser.email, newUser._id);

    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
