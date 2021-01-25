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