import express = require("express");
import {register} from "./utils";
const cors = require("cors")({origin: true});
const user = express();
user.use(cors);
const checkUser = async (req: express.Request, res: express.Response,
    next : express.NextFunction) => {
  try {
    const user = req.body;
    if (user.email === null) {
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

user.post("/user", checkUser, register);
user.get("/user",)

export default user;


