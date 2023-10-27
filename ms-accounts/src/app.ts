import express, { Express, json } from 'express'
import DbListAccounts from '@/data/DbListAccounts';
import { IListAccounts, ListAccountOutput } from '@/use-cases/IListAccounts';
import AccountsRepository from '@/data/DbAccountsRepository';
import prisma from '@/infra/prisma-client'
import { AccountOutput, ICreateAccount } from '@/use-cases/ICreateAccount';
import DbCreateAccount from '@/data/DbCreateAccount';
import { ValidationError } from '@/validation/ValidationError';
import { createInputFromRequest } from '@/shared/utils/app';

export async function setupApp(): Promise<Express> {

    //ensure services connected before proceed ()

    try {
        await prisma.$connect()
        //await amqp-connect
        //await redis-connect

    } catch (error) {
        console.log(error)
        throw error
    }

    const app = express()

    //setup middlewares

    app.use(json())
    app.use((_, res, next) => {
        res.set('access-control-allow-origin', '*')
        res.set('access-control-allow-headers', '*')
        res.set('access-control-allow-methods', '*')
        res.type('json')
        return next()
    })

    //setup routes

    app.get("/", async (req, res) => {
        return res.json({
            message: "Welcome to accounts microservice"
        })
    })

    app.get("/list", async (req, res, next) => {
        const page = req.query["page"] || 1;
        const pageSize = req.query["pageSize"] || 20;
        const useCase: IListAccounts = new DbListAccounts(new AccountsRepository(prisma));
        const result: ListAccountOutput = await useCase.execute(Number(page), Number(pageSize));

        if (result.success) return res.json(result);

        return next(result.error)

    })

    app.post("/create", async (req, res, next) => {
        const request = createInputFromRequest<any>(req)

        //todo: better validation layer

        const useCase: ICreateAccount = new DbCreateAccount(new AccountsRepository(prisma))

        const result: AccountOutput = await useCase.execute(request.id, request.accountType);

        if (result.success) return res.status(201).json(result);

        if (result.error instanceof ValidationError) return res.status(400).json({
            succces: false,
            error: result.error.name
        })

        return next(result.error)
    })

    return Promise.resolve(app);
}