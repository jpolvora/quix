import { agent as request } from "supertest";
import { setupApp } from "@/application/app";
import { randomUUID } from "crypto";
import { prisma } from "@/infra/prisma-client";
import { ValidationError } from "@/validation/ValidationError";

const poupancaEnabled = {
    id: "111994c7-81e7-4614-ad1f-9bb927751e13",
    account_type: 'Poupança',
    enabled: true
}

const poupancaDisabled = {
    id: "52bca67c-e99e-495f-b372-2bcf8e1db815",
    account_type: 'Poupança',
    enabled: false
}

const correnteEnabled = {
    id: "910481f2-66cc-4bed-a366-cd21f69bd61b",
    account_type: 'Corrente',
    enabled: true
}

const correnteDisabled = {
    id: "0cd5a079-7c34-4b0f-8027-fcbc89d9e9c8",
    account_type: 'Corrente',
    enabled: false
}

beforeAll(async () => {
    // create product categories
    await prisma.$connect();

    await prisma.accounts.deleteMany();

    await prisma.accounts.createMany({
        data: [
            poupancaEnabled,
            poupancaDisabled,
            correnteEnabled,
            correnteDisabled
        ]
    })

})

describe("Account Integration Tests", () => {
    it("should respond with status 200 when GET /", async () => {
        //arrange
        const sut = await setupApp();

        //act
        const response = await request(sut).get("/");

        //assert
        expect(response.statusCode).toBe(200);
    });

    it("should respond with status 200 when GET /list with default parameters", async () => {

        //arrange
        const sut = await setupApp();

        //act
        const res = await request(sut).get("/list").query({
            page: 1,
            pageSize: 20
        });

        //assert
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBeTruthy();
        expect(res.body.error).toBeFalsy();
        expect(res.body.data).toHaveLength(4);
    });

    it("should return no data when GET /list?page=2", async () => {

        //arrange
        const sut = await setupApp();

        //act
        const res = await request(sut).get("/list").query({
            page: 2,
            pageSize: 10
        });

        //console.log(res.body)

        //assert
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBeTruthy();
        expect(res.body.error).toBeFalsy();
        expect(res.body.data).toHaveLength(0);
    });

    it("should return two rows when GET /list?pageSize=2", async () => {

        //arrange
        const sut = await setupApp();

        //act
        const res = await request(sut).get("/list").query({
            page: 1,
            pageSize: 2
        });

        //console.log(res.body)

        //assert
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBeTruthy();
        expect(res.body.error).toBeFalsy();
        expect(res.body.data).toHaveLength(2);
    });

    it("should create account when POST /create", async () => {
        //arrange
        const sut = await setupApp();
        const payload = {
            id: randomUUID(),
            accountType: 'Poupança'
        }
        //act
        const res = await request(sut)
            .post("/create")
            .set('Content-type', 'application/json')
            .set('Authorization', 'password')
            .send(payload);

        //assert
        expect(res.statusCode).toBe(201);
    });

    it("should not create account when POST /create with missing parameters", async () => {
        //arrange
        const sut = await setupApp();
        const payload = {}
        //act
        const res = await request(sut)
            .post("/create")
            .set('Content-type', 'application/json')
            .set('Authorization', 'password')
            .send(payload);

        //console.log(res.body)

        //assert
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toBe(ValidationError.name);
    });
});