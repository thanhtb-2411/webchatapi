// eslint-disable-next-line no-unused-vars
import {Request, Response} from "express";
import {auth} from "firebase-admin/lib/auth";
import DecodedIdToken = auth.DecodedIdToken;
const admin = require("firebase-admin");

// eslint-disable-next-line require-jsdoc
export async function login(req: Request, res: Response) {

}

export async function isAuthentication(req: Request, res: Response, next: Function){
    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).send({ message: 'Unauthorized' });

    if (!authorization.startsWith('Bearer'))
        return res.status(401).send({ message: 'Unauthorized' });

    const split = authorization.split('Bearer ')
    if (split.length !== 2)
        return res.status(401).send({ message: 'Unauthorized' });

    const token = split[1]
    console.log(token)
    admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken:DecodedIdToken) => {
            const uid = decodedToken.uid;
            console.log(uid);
            res.cookie("uid",uid);
           return next;
        })
        .catch((error:any) => {
            // Handle error
            console.log(error);
        });
    return res.status(401).send({ message: 'Unauthorized' });

}
