const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const auth = async (req, res, next) => {
  try {
    let BearerToken = req.headers.authorization;
    if (BearerToken) {
      let token = BearerToken.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      req.userId = user.id;
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = auth;
