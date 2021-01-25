import firebase from "firebase";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

const {firestore} = require("../configs")
const {COLLECTION} = require("../constants");

const {getRoomSnapshotById} = require("../room/utils")
export async function createMessage(room_id: string ,messageDetails: any){
    try{
        let roomSnap = await getRoomSnapshotById(room_id)
        if((await roomSnap.data()) !== null){
            let message ={
                content : messageDetails.content,
                create_date_message: Date.now(),
                user_id: messageDetails.user_id,
            }
            console.log(message)
           let {id} = await firestore.collection(COLLECTION.ROOM).doc(room_id).collection(COLLECTION.MESSAGE).add(message)

            return id
        }
    }
    catch (error){
        console.log(error)
        return error
    }
    return null
}

export async function updateMessage(room_id:string,messageDetails: any){
    await firestore.collection(COLLECTION.ROOM).doc(room_id).collection(COLLECTION.MESSAGE).doc(messageDetails.id).update({
        content : messageDetails.content,
        create_date_message: Date.now(),
    })
}
export async function deleteMessage(room_id:string,message_id: any){
    try{
        await firestore.collection(COLLECTION.ROOM).doc(room_id).collection(COLLECTION.MESSAGE).doc(message_id).delete()
        return true
    }catch (error){
        console.log(error)
        return false
    }
}
export async function  getAllMessage(room_id:string){
    const snapshot = await firestore
        .collection(COLLECTION.ROOM)
        .doc(room_id)
        .collection(COLLECTION.MESSAGE)
        .orderBy("create_date_message", "asc")
        .get()
    return await snapshot.docs.map((doc:QueryDocumentSnapshot) => doc.data())
}