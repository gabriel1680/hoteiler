import { Hotel } from "../domain/Hotel";

describe("Hotel (unit)", () => {
    let hotel: Hotel;

    beforeEach(() => {
        const addr = { country: "country", street: "street", zipcode: "123" };
        hotel = Hotel.create(addr, 2, 1);
    });

    it("should be able to create a hotel with empty rooms", () => {
        expect(hotel.rooms).toHaveLength(0);
    });

    it("should be able to change address", () => {
        hotel.changeAddress({ country: "country2", street: "street", zipcode: "123" });
        expect(hotel.address.country).toBe("country2");
    });

    it("should be able to change available rooms", () => {
        hotel.changeAvailableRooms(3);
        expect(hotel.availableRooms).toBe(3);
    });
});

