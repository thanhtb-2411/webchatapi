const {admin, firestore} = require("../configs");
const {COLLECTION} = require("../constants");

export async function register(user:any) {
  try {
    const {displayName, password, email, name, birthday} = user;

    if (!displayName || !password || !email) {
      return null;
    }
    const {uid} = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: displayName,
    });
    await firestore.collection(COLLECTION.USER).doc(uid).set({
      displayName: displayName,
      email: email,
      name: name,
      birthday: new Date(birthday),
      rooms_id :[],
      role: "user",
    })
    return uid
  } catch (err) {
    console.log(err);
    return null;
  }
}
export  async function getAll() {
  try{
    const userQuery = await firestore
        .collection(COLLECTION.USER)
        .get()
    const users: any[] = []
    userQuery.forEach((result:any) => {
      users.push({
        id: result.id,
        data: result.data(),
      })
    })
    return users
  } catch (error) {
    return null;
  }
}
export async function getUserSnapshotByUid(uid :string){
  let userRef=  firestore
        .collection(COLLECTION.USER)
        .doc(uid)
return await userRef.get()
}


