import express, { Express } from 'express'
import ListAccountsFromDb from './data/ListAccountsFromRepository';
import { ListAccounts } from './use-cases/list-accounts';
import AccountsRepository from './data/AccountsRepository';
import prisma from './data/prisma-client'

export function initAccountMicroservice(): Promise<Express> {
    const app = express()

    app.use(express.json())

    //setup routes

    app.get("/list", async (req, res) => {
        const page = req.query["page"] || 1;
        const pageSize = req.query["pageSize"] || 20;
        const useCase: ListAccounts = new ListAccountsFromDb(new AccountsRepository(prisma));
        const result = await useCase.execute(Number(page), Number(pageSize));

        return res.json(result);
    })

    app.get("*", (req, res) => {
        //console.log('%s request', req.method)
        return res.send("Account Microservice: request received").end();
    })

    return Promise.resolve(app);
}