import request from "supertest";
import { initTransactionsMicroservice } from "../../src/app-transactions";

describe("Transactions Integration Tests", () => {
    it("should respond with status 200 when GET /", async () => {
        //arrange
        const sut = await initTransactionsMicroservice();

        //act
        const response = await request(sut).get("/");

        //assert
        expect(response.statusCode).toBe(200);
    });
});