import request from "supertest";
import { initAccountMicroservice } from "../../src/app-accounts/index";

describe("Test the root path", () => {
    it("should response the GET method", async () => {
        const app = await initAccountMicroservice();

        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});