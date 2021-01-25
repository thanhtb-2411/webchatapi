import express = require("express");
const cors = require("cors")({origin: true});
const {functions} = require("../configs")

const rooms = express();
rooms.use(cors);
const {createRoom, addUserRoom, deleteRoom,deleteUserRoom} = require("./utils")
rooms.post("/", async (req,res)=>{
    const {users_id} = req.body;
    console.log(users_id)
    await createRoom(users_id);
    res.send("ok");
})

rooms.post("/addUserRoom", async (req,res)=>{
    const {user_id,room_id} = req.body;
    await addUserRoom(user_id,room_id);
    res.send("ok");
})
rooms.post("/deleteRoom", async (req,res)=>{
    const {room_id,user_id} = req.body;
    await deleteRoom(room_id,user_id)
    res.send("ok");
})

rooms.post("/deleteUserRoom", async (req,res)=>{
    const {room_id,user_id} = req.body;
    await deleteUserRoom(room_id,user_id)
    res.send("ok");
})
exports.room = functions.https.onRequest(rooms);

