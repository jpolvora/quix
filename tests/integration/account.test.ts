import { agent as request } from "supertest";
import { initAccountMicroservice } from "../../src/app-accounts/index";
import { ListAccountOutput } from "@/app-accounts/use-cases/list-accounts";

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
        expect(res.body.data).toHaveLength(1);
    });
});