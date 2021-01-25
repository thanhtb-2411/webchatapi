import express = require("express");
const cors = require("cors")({origin: true});
const {functions} = require("../configs")
const {createMessage,deleteMessage,getAllMessage,updateMessage}= require("./utilts")
const messages = express();
messages.use(cors);

messages.post("/",  async (req,res)=>{
    const {messageDetails,room_id} = req.body;
   let message_id =  await createMessage(room_id,messageDetails);
    return res.send(message_id)
})
messages.post("/deleteMessage", async (req,res)=>{
    const {message_id,room_id} = req.body;
    let isDelete = deleteMessage(room_id,message_id)
    if(isDelete){
        return res.send(message_id)
    }
    return res.send("Error delete message")
})
messages.get("/getAllMessage", async (req,res)=>{
    const {room_id} = req.body;
    console.log(room_id)
    let messages =  await getAllMessage(room_id)
    return res.send(messages)
})
messages.post("/updateMessage", async (req,res)=>{
    const {messageDetails,room_id} = req.body;
    let message_id =  await updateMessage(room_id,messageDetails);
    return res.send(message_id)
})

exports.message = functions.https.onRequest(messages);
