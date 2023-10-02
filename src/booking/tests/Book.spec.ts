import { Book } from "../domain/Book";

describe("Book (unit)", () => {
    let hotelId: string;

    beforeEach(() => {
        hotelId = "8e933749-7e5d-4a86-adf2-8fdbf21f74c3";
    });

    it("should not be able to book a room when period is invalid", () => {
        expect(() =>
            Book.create(
                hotelId,
                102,
                new Date("2023-02-01"),
                new Date("2022-02-3")
            )
        ).toThrowError("invalid period");
    });

    it("given a new book, when created then should have a room booked event", () => {
        const book = Book.create(
            hotelId,
            102,
            new Date("2023-02-01"),
            new Date("2023-02-3")
        );
        expect(book.getEvent()).not.toBeUndefined();
    });
});
