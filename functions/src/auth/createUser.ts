import express = require('express')
const router = express.Router()
const { createUserWithEmailAndPassword,createCustomToken } = require('./utils')

router.post('/', (req, res) => {
    const user = req.body
    let userRecord =createUserWithEmailAndPassword(user)
    console.log(userRecord)
    if(userRecord != null) {
        let tokenCustom =  createCustomToken(userRecord.uid)
        if(tokenCustom!= null){
            res.cookie('tokenCustom' ,tokenCustom)
            console.log('tokenCustom')
            return  res.status(200).send('Create user success' )
        }


    }
    return  res.status(100).send('Create user unsuccessful')
})
module.exports = router