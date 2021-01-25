class firebaseUI {
    constructor() {
        let config ={
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            databaseURL: process.env.DATABASE_URL,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
        }
        this.firebase = require('https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js')
        this.firebase.initializeApp(config)
    }

}
const login = async ()=>{
    let firebaseUI = new firebaseUI();
    let email = document.getElementById("input_user").value;
    let password = document.getElementById("input_pass").value;
    console.log(email + password);

}