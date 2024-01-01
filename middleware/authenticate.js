import jwt from "jsonwebtoken";
import "dotenv/config.js"

const AuthenticateMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.replace("Bearer ", "");
    console.log(token);

    jwt.verify(token,process.env.JWT_secret);

    if (!req.session.user || !req.session.token) {
      return res.status(401).json({
        message: "Invalid request1",
      });
    }
    if (req.session.token !== token) {
      return res.status(401).json({
        message: "Invalid request2",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid request3",
    });
  }
};

export default AuthenticateMiddleware;
