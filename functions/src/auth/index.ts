const express = require("express")
const cors = require("cors")({origin: true});

const authentication = express();
const {functions} = require("../configs")
const  {login , isAuthentication} = require("./utils")
authentication.use(cors)

authentication.post("/login", isAuthentication, login)

exports.auth = functions.https.onRequest(authentication);
