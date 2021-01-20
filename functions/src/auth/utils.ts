const {admin} = require("../configs");

const createUserWithEmailAndPassword = (user : any): string => {
  console.log( "createUserWithEmailAndPassword" + user.email + user.password);

  if (user.email != "" && user.password != "") {
    admin.auth().createUser({
      email: user.email,
      password: user.password,
    })
        .then( (userRecord:any) => {
          // A UserRecord representation of the newly created user is returned
          console.log("Successfully created new user:", userRecord.uid);
          return userRecord.uid;
        })
        .catch( (error:any) => {
          console.log("Error creating new user:", error);
        });
  }
  return "";
};

// const createCustomToken = (uid) =>{
//     console.log('createCustomToken')
//     if(uid!=""){
//         admin.auth().createCustomToken(uid)
//             .then((customToken) =>{
//                 return customToken
//             })
//             .catch((error) =>{
//                 return null;
//             })
//     }
//     return null;
// }

// exports.createCustomToken =createCustomToken
exports.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
