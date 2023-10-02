import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { AppModule } from "../http/nestjs/app.module";

describe("HotelController (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it("/ (POST)", async () => {
        await request(app.getHttpServer())
            .post("/hotels")
            .send(createHotelDto())
            .expect(201);
    });

    it("/ (PUT)", async () => {
        await request(app.getHttpServer())
            .post("/hotels")
            .send({ ...createHotelDto(), name: "admin1@gmail.com" })
            .expect(204);
    });

    function createHotelDto() {
        return {
            name: "admin@user.com",
            address: {
                country: "country 1",
                street: "street 1",
                zipcode: "123456",
            },
            rooms_available: 100,
            rooms_booked: 98,
        };
    }
});
