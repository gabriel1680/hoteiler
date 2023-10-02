import { UpdateHotel } from "../../application/usecase/UpdateHotel";
import { AddressLike, Hotel } from "../../domain/Hotel";
import { HotelRepository } from "../../domain/HotelRepository";
import { InMemoryHotelRepository } from "../../infra/database/InMemoryHotelRepository";

describe("UpdateHotel (narrow integration)", () => {
    let address: AddressLike;
    let repository: HotelRepository;
    let sut: UpdateHotel;

    beforeEach(() => {
        address = {
            country: "country",
            street: "street",
            zipcode: "1233456",
        };
        repository = new InMemoryHotelRepository();
        sut = new UpdateHotel(repository);
    });

    it("should not update a hotel when it does not exists", async () => {
        const updateHotelData = {
            id: "invalid id",
            name: "admin@user.com",
            address,
            roomsAvailable: 2,
        };
        await expect(sut.execute(updateHotelData)).rejects.toThrowError();
    });

    it("should be able to update a hotel", async () => {
        const hotelId = await addHotelTorepository();
        const updateHotelData = {
            id: hotelId,
            name: "admin@user.com",
            address: { ...address, country: "country2" },
            roomsAvailable: 2,
        };
        await sut.execute(updateHotelData);
        const hotel = await repository.get(hotelId);
        expect(hotel!.availableRooms).toBe(2);
        expect(hotel!.address.country).toBe("country2");
    });

    async function addHotelTorepository() {
        const hotel = Hotel.create("admin@user.com", address, 1, 1);
        await repository.save(hotel);
        return hotel.id.value;
    }
});
