import { Id } from "../../@kernel/domain/Id";
import { Hotel } from "../domain/Hotel";

describe("Hotel (unit)", () => {
    let hotel: Hotel;

    beforeEach(() => {
        hotel = Hotel.create({}, 2);
    });

    it("should be able to create a hotel with all rooms available and empty rooms", () => {
        expect(hotel.availableRooms).toStrictEqual(2);
        expect(hotel.rooms).toHaveLength(0);
    });

    it("should be able to book rooms", () => {
        hotel.bookRooms(1);
        expect(hotel.availableRooms).toBe(1);
    });

    it("should not be able to book more rooms than hotel capacity", () => {
        expect(() => hotel.bookRooms(3)).toThrowError(
            "cannot book more rooms than hotel capacity"
        );
    });

    it("should be able to add room", () => {
        hotel.addRoom(100, 80, "AVAILABLE");
        expect(hotel.rooms).toHaveLength(1);
    });

    it("should be able to change address", () => {
        hotel.addRoom(100, 80, "AVAILABLE");
        expect(hotel.rooms).toHaveLength(1);
    });
});

