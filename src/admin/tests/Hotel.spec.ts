import { Hotel } from "../domain/Hotel";
import { RoomBook } from "../domain/RoomBook";

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

    it("should be able to add a room", () => {
        hotel.addRoom(102, 100, "AVAILABLE");
        expect(hotel.rooms).toHaveLength(1);
    });

    it("should be able to book a room", () => {
        hotel.addRoom(104, 200, "AVAILABLE");
        const book = RoomBook.create(104, new Date(2023, 11, 15), new Date(2023, 11, 20));
        hotel.bookRoom(book);
        expect(hotel.rooms[0].getBookedPeriods()).toHaveLength(1);
    });
});

