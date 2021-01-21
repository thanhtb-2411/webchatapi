const {admin} = require("../configs");

// eslint-disable-next-line no-unused-vars
import express = require("express");
// import { handleError } from '../errors/handle-errors';
// import * as nodemailer from 'nodemailer';

// eslint-disable-next-line require-jsdoc
export async function register(req: express.Request, res: express.Response) {
  try {
    const {displayName, password, email} = req.body;

    if (!displayName || !password || !email) {
      return res.status(400).send({message: "Missing fields"});
    }

    const {uid} = await admin.auth().createUser({
      displayName,
      password,
      email,
    });
    await admin.auth().setCustomUserClaims(uid, {role: "user"});
    const accessToken = await admin.auth().createCustomToken(uid);

    await admin.firestore().collection("users").add({
      email: email,
      uid: uid,
      username: displayName,
      role: "user",
    });
    return res.status(201).send({uid, accessToken});
  } catch (err) {
    return res.send({message: "Error"});
  }
}
export async function getAllUser(req: express.Request, res: express.Response) {
    try{
        
    }
    catch (err){

    }
}

