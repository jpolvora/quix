import express, { Express } from 'express'

export function initAccountMicroservice(): Promise<Express> {
    const app = express()

    //setup routes

    app.get("*", (req, res) => {
        console.log('%s request', req.method)
        return res.send("Account Microservice: request received").end();
    })

    return Promise.resolve(app);
}