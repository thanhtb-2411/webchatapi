import express = require("express");
const cors = require("cors")({origin: true});
const createUser = require("./createUser");
const app = express();

app.use(cors);

const {functions} = require("../configs");

const checkEmail = (email:string) => {
  return false;
};

const checkUser = async (req: express.Request, res: express.Response,
    next : express.NextFunction) => {
  try {
    const user = req.body;
    if (user.email === null && !checkEmail(user.email)) {
      console.log("thanh");
      return res.status(100).send("Email already exists");
    }
    console.log("checkUser");
    // return res.status(200).send('ok')
    return next();
  } catch (error) {
    return res.status(403).send("ERROR");
  }
};

app.use("/abc", checkUser, createUser);

exports.createUser = functions.https.onRequest(app);
