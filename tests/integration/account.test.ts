import request from "supertest";
import { initAccountMicroservice } from "../../src/app-accounts/index";

describe("Account Integration Tests", () => {
    it("should respond with status 200 when GET /", async () => {
        //arrange
        const sut = await initAccountMicroservice();

        //act
        const response = await request(sut).get("/");

        //assert
        expect(response.statusCode).toBe(200);
    });
});