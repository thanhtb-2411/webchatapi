import express = require("express");
import {register, getAll,getUserSnapshotByUid} from "./utils";
const cors = require("cors")({origin: true});

const user = express();
user.use(cors);
const  {functions} = require("../configs");
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



user.post("/signup", checkUser, async (req,res) =>{
    const  uid = await register(req.body);
  if(uid!=null){
    return res.status(200).send(uid);
  }
  return res.status(100).send("ERROR");

});


user.get("/",   async (req,res) =>{
 let users = getAll();
 if(users!=null){
   return res.status(200).send(users);
 }
  return res.status(100).send("ERROR");
});
user.get("/:uid",  async (req,res) =>{
    const {uid} = req.params;
    let userSnap =await getUserSnapshotByUid(uid);
    let user =userSnap.data();
      console.log(user)
      if(user!=null){
          return res.status(200).send(user);
      }
      return res.status(100).send("ERROR");
});
exports.user = functions.https.onRequest(user);


