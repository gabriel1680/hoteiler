import { BookPeriod } from "../../@kernel/domain/BookPeriod";
import { HotelRoom } from "../domain/HotelRoom";

describe("HotelRoom (unit)", () => {
    let hotelRoom: HotelRoom;
    let bookedHotelRoom: HotelRoom;
    let period: BookPeriod;

    beforeEach(() => {
        hotelRoom = HotelRoom.create(100, 80, "AVAILABLE");
        bookedHotelRoom = HotelRoom.create(100, 80, "UNAVAILABLE");
        period = new BookPeriod(new Date(2023, 8, 18), new Date(2023, 9, 8));
    });

    it("should not be able to book a room on a booked period", () => {
        hotelRoom.book(period);
        expect(() => hotelRoom.book(period)).toThrowError(
            "Room 100 is already book at period 2023-8-18 to 2023-9-8"
        );
    });

    it("should not be able to book a unavailable room", () => {
        expect(() => bookedHotelRoom.book(period)).toThrowError(
            "cannot book a unavailable room"
        );
    });
});
