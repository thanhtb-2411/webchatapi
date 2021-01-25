const {firestore} = require("../configs")
// eslint-disable-next-line no-unused-vars
const {COLLECTION} = require("../constants");
const {getUserSnapshotByUid} = require("../user/utils")

const getRoomSnapshotById = async (room_id:string) =>{
    let roomRef=  firestore
        .collection(COLLECTION.ROOM)
        .doc(room_id)
    return await roomRef.get()
}
export async function createRoom(users_id:any) {

    let room ={
        room_name : "",
        createDate_Room : Date.now(),
        user_admin_room : users_id[0],
        users_id :users_id
    }
    const roomRf = await firestore.collection(COLLECTION.ROOM).add(room)

    let room_name =""
    for (const uid of users_id) {
        let userSnap = await  getUserSnapshotByUid(uid)
        let user =await userSnap.data()
        room_name+=user.displayName + ", "
        user.rooms_id.push(roomRf.id)
        await firestore.collection(COLLECTION.USER).doc(uid).set(user)
    }
    room_name.slice(room_name.length-2)
    await firestore.collection(COLLECTION.ROOM).doc(roomRf.id).update({
        room_name: room_name,
    })
    return roomRf.id
}
export async function addUserRoom(user_id: string, room_id:string){

    let roomSnap = await  getRoomSnapshotById(room_id)
    let userSnap = await  getUserSnapshotByUid(user_id)
    let room = await roomSnap.data()
    let user =await userSnap.data()

    if(user==null) return false
    if(room!=null){
        room.users_id.push(userSnap.id)
        user.rooms_id.push(roomSnap.id)
        await firestore.collection(COLLECTION.ROOM).doc(roomSnap.id).set(room)
        await firestore.collection(COLLECTION.USER).doc(userSnap.id).set(user)
    }else {
        return false
    }
    return true
}

export async function updateRoom(room :any, room_id:string){
        await firestore.collection(COLLECTION.ROOM).doc(room_id).update(room)
}

export async function deleteRoom(room_id:string, user_id:string){
    try {
        let roomSnap = await  getRoomSnapshotById(room_id)
        let room = await roomSnap.data()
        if(user_id === room.user_admin_room){
            for (const user_id of room.users_id) {
                await deleteUserRoom(room_id, user_id)
            }
            await firestore.collection(COLLECTION.ROOM).doc(room_id).delete();
            return true
        }
        else {
            throw new Error("403: Unauthorized")
        }
    }catch (error){
        console.log(error)
    }
    return false
}
export async function deleteUserRoom(room_id:string, user_id:string){
    try {
        let roomSnap = await  getRoomSnapshotById(room_id)
        let userSnap = await  getUserSnapshotByUid(user_id)
        let room = await roomSnap.data()
        let user =await userSnap.data()
        console.log(room_id)

        user.rooms_id.splice(user.rooms_id.indexOf(room_id),1)
        room.users_id.splice(room.users_id.indexOf(user_id),1)
       console.log(room)
        await firestore.collection(COLLECTION.ROOM).doc(room_id).set(room);
        await firestore.collection(COLLECTION.USER).doc(user_id).set(user);

        return true
    }catch (error){
        console.log(error)
    }
    return false
}