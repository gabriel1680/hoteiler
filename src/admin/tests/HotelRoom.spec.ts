import { HotelRoom } from "../domain/HotelRoom";

describe("HotelRoom (unit)", () => {
    let hotelRoom: HotelRoom;
    let bookedHotelRoom: HotelRoom;

    beforeEach(() => {
        hotelRoom = HotelRoom.create(100, 80, "AVAILABLE");
        bookedHotelRoom = HotelRoom.create(100, 80, "UNAVAILABLE");
    });

    it("should be able to book a room", () => {
        hotelRoom.book();
        expect(hotelRoom.isAvailable()).toBeFalsy();
    });

    it("should not be able to book a unavailable room", () => {
        expect(() => bookedHotelRoom.book()).toThrowError(
            "cannot book a unavailable room"
        );
    });
});
