import admin = require("firebase-admin")
import functions = require("firebase-functions")

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://superchat-bcc4c.firebaseio.com",
});

const firestore = admin.firestore();
const realtimeDB = admin.database();

exports.functions = functions;
exports.admin = admin;
exports.firestore = firestore;
exports.realtimeDB = realtimeDB;
