import express, { Express } from 'express'

export function initTransactionsMicroservice(): Promise<Express> {
    const app = express()

    //setup routes

    app.get("*", (req, res) => {
        //console.debug('%s request', req.method)
        return res.send("TransactionsMicroservice: request received").end();
    })

    return Promise.resolve(app)
}