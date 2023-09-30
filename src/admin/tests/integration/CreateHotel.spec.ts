import { CreateHotel } from "../../application/usecase/CreateHotel";
import { HotelRepository } from "../../domain/HotelRepository";
import { InMemoryHotelRepository } from "../../infra/database/InMemoryHotelRepository";

describe("CreateHotel (narrow integration)", () => {
    let repository: HotelRepository;
    let sut: CreateHotel;

    beforeEach(() => {
        repository = new InMemoryHotelRepository();
        sut = new CreateHotel(repository);
    });

    it("should be able to add a hotel to repository", async () => {
        const createHotelData = {
            name: "admin@user.com",
            address: {
                country: "country",
                street: "street",
                zipcode: "1233456",
            },
            roomsAvailable: 2,
            roomsBooked: 1,
        };
        await sut.execute(createHotelData);
        expect(await repository.count()).toBe(1);
    });
});
