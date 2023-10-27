import { agent as request } from "supertest";
import { initAccountMicroservice } from "../../src/app-accounts/index";
import { ListAccountOutput } from "@/app-accounts/use-cases/list-accounts";
import prisma from "../../src/app-accounts/data/prisma-client";
import { randomUUID } from "crypto";

beforeAll(async () => {
    // create product categories
    await prisma.accounts.deleteMany()

    await prisma.accounts.createMany({
        data: [
            {
                id: randomUUID(),
                account_type: 'Poupança',
                enabled: true
            },
            {
                id: randomUUID(),
                account_type: 'Poupança',
                enabled: false
            },
            {
                id: randomUUID(),
                account_type: 'Corrente',
                enabled: true
            },
            {
                id: randomUUID(),
                account_type: 'Corrente',
                enabled: false
            }]
    })

})

describe("Account Integration Tests", () => {
    it("should respond with status 200 when GET /", async () => {
        //arrange
        const sut = await initAccountMicroservice();

        //act
        const response = await request(sut).get("/");

        //assert
        expect(response.statusCode).toBe(200);
    });

    it("should respond with status 200 when GET /list", async () => {

        //arrange
        const sut = await initAccountMicroservice();

        //act
        const res = await request(sut).get("/list").query({
            page: 1,
            pageSize: 20
        });

        //console.log(res.body)

        //assert
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBeTruthy();
        expect(res.body.error).toBeFalsy();
        expect(res.body.data).toHaveLength(4);
    });
});