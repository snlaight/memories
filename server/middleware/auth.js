import jwt from "jsonwebtoken";

/**
 * A middleware function that checks the authorization header for a valid token.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
const auth = async (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization;
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "supersecrettest");
      req.userId = decodedData.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
